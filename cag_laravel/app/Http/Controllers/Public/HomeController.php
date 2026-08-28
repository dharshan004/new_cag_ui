<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\News;
use App\Models\Notification;
use App\Models\AuditReport;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        $news = News::where('is_active', true)
            ->orderBy('publish_date', 'desc')
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get();

        $notifications = Notification::where('is_active', true)
            ->where(function($q) {
                $q->whereNull('expiry_date')->orWhere('expiry_date', '>=', now());
            })
            ->orderBy('publish_date', 'desc')
            ->orderBy('id', 'desc')
            ->limit(10)
            ->get();

        $totalReports = AuditReport::where('is_active', true)->count();

        return view('public.home', compact('banners', 'news', 'notifications', 'totalReports'));
    }
}
