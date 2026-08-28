<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuditReport;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = AuditReport::with(['governmentType', 'state'])
            ->where('is_active', true);

        if ($request->filled('query')) {
            $search = '%' . $request->input('query') . '%';
            $query->where(function($q) use ($search) {
                $q->where('title_en', 'ILIKE', $search)
                  ->orWhere('title_hi', 'ILIKE', $search);
            });
        }

        if ($request->filled('level') && $request->input('level') !== 'All') {
            $level = $request->input('level');
            $query->whereHas('governmentType', function($q) use ($level) {
                $q->where('name_en', $level);
            });
        }

        if ($request->filled('sector') && $request->input('sector') !== 'All') {
            $query->where('sector', $request->input('sector'));
        }

        if ($request->filled('type') && $request->input('type') !== 'All') {
            $query->where('report_type', $request->input('type'));
        }

        $page = (int) $request->input('page', 1);
        $limit = 10;
        
        $total = $query->count();
        $reports = $query->orderBy('year_of_report', 'desc')
            ->orderBy('date_tabled', 'desc')
            ->orderBy('id', 'desc')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        $items = $reports->map(function($r) {
            return [
                'id' => (string) $r->id,
                'title' => $r->title_en,
                'title_hi' => $r->title_hi,
                'sector' => $r->sector ?? 'General',
                'admin_level' => $r->governmentType->name_en ?? 'States',
                'report_type' => $r->report_type ?? 'Performance',
                'published_date' => $r->date_tabled ? substr($r->date_tabled, 0, 10) : (string) $r->year_of_report,
                'file_url' => $r->main_report_file ?? '#',
                'noody_book_url' => $r->noody_book_file,
                'youtube_url' => $r->youtube_video_url,
                'digital_url' => $r->digital_report_url,
                'state' => $r->state->name_en ?? null,
            ];
        });

        return response()->json([
            'items' => $items,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $report = AuditReport::with(['governmentType', 'state', 'files'])
            ->where('is_active', true)
            ->find($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        return response()->json([
            'id' => (string) $report->id,
            'title' => $report->title_en,
            'title_hi' => $report->title_hi,
            'sector' => $report->sector ?? 'General',
            'admin_level' => $report->governmentType->name_en ?? 'States',
            'report_type' => $report->report_type ?? 'Performance',
            'published_date' => $report->date_tabled ? substr($report->date_tabled, 0, 10) : (string) $report->year_of_report,
            'file_url' => $report->main_report_file ?? '#',
            'noody_book_url' => $report->noody_book_file,
            'youtube_url' => $report->youtube_video_url,
            'digital_url' => $report->digital_report_url,
            'state' => $report->state->name_en ?? null,
            'files' => $report->files,
        ]);
    }
}
