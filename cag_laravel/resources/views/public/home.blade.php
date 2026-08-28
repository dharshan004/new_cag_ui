@extends('layouts.public')

@section('title', 'CAG India | Supreme Audit Institution')

@section('content')
<!-- Hero Banner -->
<div class="bg-gradient-to-r from-cag-navy to-cag-blue text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div class="lg:col-span-2 space-y-4">
            <span class="bg-cag-gold/20 text-cag-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Official Portal</span>
            <h1 class="text-3xl md:text-5xl font-bold leading-tight">Comptroller and Auditor General of India</h1>
            <p class="text-cag-light text-base md:text-lg">Supreme Audit Institution of India committed to accountability and transparency in public governance.</p>
            <div class="pt-2 flex flex-wrap gap-4">
                <a href="{{ route('reports.index') }}" class="bg-cag-gold text-cag-navy font-semibold px-5 py-2.5 rounded shadow hover:bg-yellow-400 transition text-sm">Browse Audit Reports</a>
                <a href="{{ route('about') }}" class="bg-white/10 text-white font-medium px-5 py-2.5 rounded border border-white/20 hover:bg-white/20 transition text-sm">About CAG</a>
            </div>
        </div>
        
        <!-- Stats Card -->
        <div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white space-y-6">
            <h3 class="text-lg font-semibold text-cag-gold border-b border-white/10 pb-2">Institutional Impact</h3>
            <div class="grid grid-cols-2 gap-4 text-center">
                <div class="bg-white/5 p-4 rounded-lg">
                    <div class="text-3xl font-bold text-white">150+</div>
                    <div class="text-xs text-cag-light mt-1">Years of Excellence</div>
                </div>
                <div class="bg-white/5 p-4 rounded-lg">
                    <div class="text-3xl font-bold text-cag-gold">{{ $totalReports }}+</div>
                    <div class="text-xs text-cag-light mt-1">Audit Reports</div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Main Content Grid -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- News & Events (2 Cols) -->
    <div class="lg:col-span-2 space-y-6">
        <div class="flex justify-between items-center border-b pb-3">
            <h2 class="text-xl font-bold text-cag-navy">News & Press Releases</h2>
        </div>
        
        <div class="space-y-4">
            @forelse($news as $item)
                <div class="bg-white p-5 rounded-lg border shadow-sm hover:shadow transition flex flex-col md:flex-row gap-4">
                    <div class="flex-1 space-y-2">
                        <span class="text-xs text-gray-500 font-medium">{{ $item->publish_date }}</span>
                        <h3 class="font-bold text-base text-gray-900 leading-snug">{{ $item->title_en }}</h3>
                        <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed">{{ Str::limit(strip_tags($item->content_en), 160) }}</p>
                    </div>
                </div>
            @empty
                <p class="text-sm text-gray-500 py-4">No recent news announcements available.</p>
            @endforelse
        </div>
    </div>

    <!-- Notifications Sidebar (1 Col) -->
    <div class="space-y-6">
        <div class="border-b pb-3">
            <h2 class="text-xl font-bold text-cag-navy">Latest Notifications</h2>
        </div>

        <div class="bg-white rounded-lg border shadow-sm divide-y">
            @forelse($notifications as $notice)
                <div class="p-4 hover:bg-gray-50 transition space-y-1">
                    <span class="text-xs font-semibold text-cag-blue">{{ $notice->publish_date }}</span>
                    <p class="text-xs text-gray-800 font-medium leading-normal">{{ $notice->title_en }}</p>
                    @if($notice->file_url)
                        <a href="{{ $notice->file_url }}" target="_blank" class="inline-block text-xs text-blue-600 font-semibold hover:underline mt-1">Download Document 📥</a>
                    @endif
                </div>
            @empty
                <div class="p-4 text-xs text-gray-500">No active notifications.</div>
            @endforelse
        </div>
    </div>

</div>
@endsection
