<?php

namespace App\Http\Controllers\Api;

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
            ->get(['title_en', 'title_hi', 'subtitle_en', 'subtitle_hi', 'image_url', 'link_url']);

        $news = News::where('is_active', true)
            ->orderBy('publish_date', 'desc')
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get(['id', 'title_en', 'title_hi', 'content_en', 'content_hi', 'image_url', 'news_type', 'tag', 'publish_date']);

        $notifications = Notification::where('is_active', true)
            ->where(function($q) {
                $q->whereNull('expiry_date')->orWhere('expiry_date', '>=', now());
            })
            ->orderBy('publish_date', 'desc')
            ->orderBy('id', 'desc')
            ->limit(10)
            ->get(['id', 'title_en', 'title_hi', 'content_type', 'link_url', 'file_url', 'publish_date']);

        $totalReports = AuditReport::where('is_active', true)->count();

        return response()->json([
            'hero_title' => 'Comptroller and Auditor General of India',
            'hero_subtitle' => 'Supreme Audit Institution of India',
            'stats' => [
                ['label' => 'Years of Excellence', 'value' => '150+'],
                ['label' => 'Reports Tabled', 'value' => (string) ($totalReports > 0 ? $totalReports : '700+')]
            ],
            'cag_message' => [
                'name' => 'Shri K. Sanjay Murthy',
                'title' => 'Comptroller and Auditor General of India',
                'message' => 'Welcome to the official portal of the Comptroller and Auditor General of India. We are committed to promoting accountability, transparency, and good governance through high-quality auditing.'
            ],
            'banners' => $banners,
            'news' => $news,
            'notifications' => $notifications
        ]);
    }
}
