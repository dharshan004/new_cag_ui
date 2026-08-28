<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\FormerCag;
use App\Models\OrgDesignation;
use App\Models\Page;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function show($slug = 'overview')
    {
        $cmsPage = Page::where('slug', $slug)->where('is_active', true)->first();
        
        if ($slug === 'former-cags') {
            $formerCags = FormerCag::where('is_active', true)->orderBy('term_start', 'asc')->get();
            return view('public.about.former-cags', compact('cmsPage', 'formerCags'));
        }

        if ($slug === 'organisation-chart') {
            $designations = OrgDesignation::with('officers')->where('is_active', true)->get();
            return view('public.about.org-chart', compact('cmsPage', 'designations'));
        }

        return view('public.about.show', compact('cmsPage', 'slug'));
    }
}
