<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrgOfficer;

class OfficerController extends Controller
{
    public function index()
    {
        $officers = OrgOfficer::with('designation')
            ->where('is_active', true)
            ->get();

        return response()->json($officers);
    }
}
