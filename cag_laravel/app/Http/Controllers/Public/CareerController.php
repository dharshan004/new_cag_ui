<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\RecruitmentNotice;
use App\Models\Tender;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function recruitment()
    {
        $notices = RecruitmentNotice::where('is_active', true)
            ->orderBy('publish_date', 'desc')
            ->paginate(15);

        return view('public.career.recruitment', compact('notices'));
    }

    public function tenders()
    {
        $tenders = Tender::where('is_active', true)
            ->orderBy('publish_date', 'desc')
            ->paginate(15);

        return view('public.career.tenders', compact('tenders'));
    }
}
