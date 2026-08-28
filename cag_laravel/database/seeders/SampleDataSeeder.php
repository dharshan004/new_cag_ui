<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Banners
        if (DB::table('cag_new.banners')->count() === 0) {
            DB::table('cag_new.banners')->insert([
                [
                    'title_en' => 'Comptroller and Auditor General of India',
                    'title_hi' => 'भारत के नियंत्रक एवं महालेखापरीक्षक',
                    'subtitle_en' => 'Promoting Accountability, Transparency and Good Governance',
                    'subtitle_hi' => 'जवाबदेही, पारदर्शिता और सुशासन को बढ़ावा देना',
                    'image_url' => '/admin-uploads/images/hero_banner_1.jpg',
                    'link_url' => '/reports',
                    'display_order' => 1,
                    'is_active' => true,
                    'created_at' => now(),
                ],
                [
                    'title_en' => 'Supreme Audit Institution of India',
                    'title_hi' => 'भारत का सर्वोच्च लेखापरीक्षा संस्थान',
                    'subtitle_en' => '150+ Years of Excellence in Public Audit',
                    'subtitle_hi' => 'सार्वजनिक लेखापरीक्षा में 150+ वर्षों की उत्कृष्टता',
                    'image_url' => '/admin-uploads/images/hero_banner_2.jpg',
                    'link_url' => '/reports',
                    'display_order' => 2,
                    'is_active' => true,
                    'created_at' => now(),
                ]
            ]);
        }

        // 2. News
        if (DB::table('cag_new.news')->count() === 0) {
            DB::table('cag_new.news')->insert([
                [
                    'title_en' => 'Release of Union Government Finance Accounts 2025-26',
                    'title_hi' => '2025-26 के लिए केंद्र सरकार के वित्त खातों का विमोचन',
                    'content_en' => 'Official publication of audited finance and appropriation accounts statement for central ministries.',
                    'content_hi' => 'केंद्रीय मंत्रालयों के लिए लेखा परीक्षित वित्त और विनियोग खातों के विवरण का आधिकारिक प्रकाशन।',
                    'news_type' => 'Press Release',
                    'tag' => 'Finance',
                    'publish_date' => '2026-08-20',
                    'is_active' => true,
                    'created_at' => now(),
                ],
                [
                    'title_en' => 'International Training Program on Environmental Audit Launched',
                    'title_hi' => 'पर्यावरण लेखा परीक्षा पर अंतर्राष्ट्रीय प्रशिक्षण कार्यक्रम शुरू',
                    'content_en' => 'iCISA hosts specialized training for delegates from 32 countries in auditing ecological policies.',
                    'content_hi' => 'iCISA पारिस्थितिक नीतियों के ऑडिट में 32 देशों के प्रतिनिधियों के लिए विशेष प्रशिक्षण की मेजबानी करता है।',
                    'news_type' => 'Event',
                    'tag' => 'International',
                    'publish_date' => '2026-08-18',
                    'is_active' => true,
                    'created_at' => now(),
                ]
            ]);
        }

        // 3. Notifications
        if (DB::table('cag_new.notifications')->count() === 0) {
            DB::table('cag_new.notifications')->insert([
                [
                    'title_en' => 'Empanelment of Chartered Accountant Firms for FY 2026-27',
                    'title_hi' => 'वित्तीय वर्ष 2026-27 के लिए चार्टर्ड अकाउंटेंट फर्मों का पैनलकरण',
                    'content_type' => 'PDF',
                    'link_url' => '#',
                    'publish_date' => '2026-08-15',
                    'is_active' => true,
                    'created_at' => now(),
                ]
            ]);
        }
    }
}
