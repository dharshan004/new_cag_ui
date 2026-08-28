<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AuditReport;
use App\Models\GovernmentType;
use App\Models\State;
use App\Models\JournalIssue;
use App\Models\OrgDesignation;

class AdminOptionsController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');

        if ($type === 'government_type_id') {
            $rows = GovernmentType::where('is_active', true)->orderBy('name_en')->get();
            return response()->json($rows->map(fn($r) => ['value' => (string) $r->id, 'label' => $r->name_en]));
        }

        if ($type === 'state_id') {
            $rows = State::where('is_active', true)->orderBy('name_en')->get();
            return response()->json($rows->map(fn($r) => ['value' => (string) $r->id, 'label' => $r->name_en]));
        }

        if ($type === 'designation_id') {
            $rows = OrgDesignation::where('is_active', true)->orderBy('title_en')->get();
            return response()->json($rows->map(fn($r) => ['value' => (string) $r->id, 'label' => $r->title_en]));
        }

        if ($type === 'issue_id') {
            $rows = JournalIssue::where('is_active', true)
                ->orderBy('year', 'desc')
                ->orderBy('volume_number', 'desc')
                ->orderBy('issue_number', 'desc')
                ->get();
            return response()->json($rows->map(fn($r) => [
                'value' => (string) $r->id,
                'label' => "Vol {$r->volume_number} Issue {$r->issue_number} ({$r->year})"
            ]));
        }

        if ($type === 'report_id') {
            $rows = AuditReport::where('is_active', true)->orderBy('created_at', 'desc')->get();
            return response()->json($rows->map(fn($r) => ['value' => (string) $r->id, 'label' => $r->title_en]));
        }

        return response()->json([]);
    }
}
