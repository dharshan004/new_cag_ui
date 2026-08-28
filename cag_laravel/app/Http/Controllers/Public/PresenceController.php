<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\State;
use Illuminate\Http\Request;

class PresenceController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->input('type', 'state');
        
        $offices = Office::with('state')
            ->where('is_active', true)
            ->when($type, function($q) use ($type) {
                $q->where('office_type', $type);
            })
            ->orderBy('name_en')
            ->get();

        $states = State::where('is_active', true)->orderBy('name_en')->get();

        return view('public.presence.index', compact('offices', 'states', 'type'));
    }
}
