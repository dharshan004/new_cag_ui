<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormerCag;

class FormerCagController extends Controller
{
    public function index()
    {
        $cags = FormerCag::where('is_active', true)
            ->orderBy('term_start', 'asc')
            ->get();

        return response()->json($cags);
    }
}
