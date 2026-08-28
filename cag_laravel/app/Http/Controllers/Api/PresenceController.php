<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Office;
use Illuminate\Http\Request;

class PresenceController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');

        $offices = Office::with('state')
            ->where('is_active', true)
            ->when($type, function($q) use ($type) {
                $q->where('office_type', $type);
            })
            ->orderBy('name_en')
            ->get();

        return response()->json($offices);
    }
}
