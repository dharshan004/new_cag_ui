@extends('layouts.public')

@section('title', 'Audit Reports | CAG India')

@section('content')
<div class="bg-cag-navy text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl md:text-3xl font-bold">Audit Reports Library</h1>
        <p class="text-cag-light text-xs md:text-sm mt-1">Search and access public audit reports presented to Parliament and State Legislatures.</p>
    </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Search & Filter Bar -->
    <form method="GET" action="{{ route('reports.index') }}" class="bg-white p-4 rounded-lg border shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Search Keywords</label>
            <input type="text" name="query" value="{{ request('query') }}" placeholder="Search title..." class="w-full text-xs px-3 py-2 border rounded focus:ring-1 focus:ring-cag-blue outline-none">
        </div>

        <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Government Level</label>
            <select name="level" class="w-full text-xs px-3 py-2 border rounded focus:ring-1 focus:ring-cag-blue outline-none">
                <option value="All">All Levels</option>
                @foreach($governmentTypes as $gt)
                    <option value="{{ $gt->name_en }}" {{ request('level') == $gt->name_en ? 'selected' : '' }}>{{ $gt->name_en }}</option>
                @endforeach
            </select>
        </div>

        <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Report Type</label>
            <select name="type" class="w-full text-xs px-3 py-2 border rounded focus:ring-1 focus:ring-cag-blue outline-none">
                <option value="All">All Types</option>
                <option value="Performance" {{ request('type') == 'Performance' ? 'selected' : '' }}>Performance Audit</option>
                <option value="Compliance" {{ request('type') == 'Compliance' ? 'selected' : '' }}>Compliance Audit</option>
                <option value="Financial" {{ request('type') == 'Financial' ? 'selected' : '' }}>Financial Audit</option>
            </select>
        </div>

        <div class="flex items-end gap-2">
            <button type="submit" class="w-full bg-cag-blue text-white text-xs font-semibold py-2 px-4 rounded hover:bg-cag-navy transition">Filter Reports</button>
            <a href="{{ route('reports.index') }}" class="bg-gray-100 text-gray-600 text-xs font-medium py-2 px-3 rounded hover:bg-gray-200 transition">Reset</a>
        </div>
    </form>

    <!-- Reports Grid -->
    <div class="space-y-4">
        @forelse($reports as $report)
            <div class="bg-white p-5 rounded-lg border shadow-sm hover:shadow transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="space-y-1.5 flex-1">
                    <div class="flex flex-wrap items-center gap-2 text-xs">
                        <span class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">{{ $report->governmentType->name_en ?? 'Union/State' }}</span>
                        <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{{ $report->year_of_report }}</span>
                        @if($report->sector)
                            <span class="bg-amber-50 text-amber-700 px-2 py-0.5 rounded">{{ $report->sector }}</span>
                        @endif
                    </div>
                    <h3 class="font-bold text-base text-gray-900 leading-snug">{{ $report->title_en }}</h3>
                </div>

                <div class="flex items-center gap-2">
                    @if($report->main_report_file)
                        <a href="{{ $report->main_report_file }}" target="_blank" class="bg-cag-navy text-white text-xs font-semibold px-4 py-2 rounded hover:bg-cag-blue transition flex items-center gap-1">
                            📄 Download PDF
                        </a>
                    @endif
                </div>
            </div>
        @empty
            <div class="bg-white p-8 text-center text-gray-500 rounded-lg border">
                No audit reports found matching your criteria.
            </div>
        @endforelse
    </div>

    <!-- Pagination Links -->
    <div class="mt-8">
        {{ $reports->links() }}
    </div>

</div>
@endsection
