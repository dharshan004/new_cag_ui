<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AuditReport;
use App\Models\GovernmentType;
use App\Models\State;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = AuditReport::with(['governmentType', 'state'])
            ->where('is_active', true);

        if ($request->filled('query')) {
            $searchTerm = '%' . $request->input('query') . '%';
            $query->where(function($q) use ($searchTerm) {
                $q->where('title_en', 'ILIKE', $searchTerm)
                  ->orWhere('title_hi', 'ILIKE', $searchTerm);
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

        $reports = $query->orderBy('year_of_report', 'desc')
            ->orderBy('date_tabled', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        $governmentTypes = GovernmentType::where('is_active', true)->get();
        $states = State::where('is_active', true)->orderBy('name_en')->get();

        return view('public.reports.index', compact('reports', 'governmentTypes', 'states'));
    }

    public function show($id)
    {
        $report = AuditReport::with(['governmentType', 'state', 'files'])
            ->where('is_active', true)
            ->findOrFail($id);

        return view('public.reports.show', compact('report'));
    }
}
