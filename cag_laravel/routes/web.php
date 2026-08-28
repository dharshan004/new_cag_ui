<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ReportController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\PresenceController;
use App\Http\Controllers\Public\CareerController;

// Public Website Routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Audit Reports
Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
Route::get('/reports/{id}', [ReportController::class, 'show'])->name('reports.show');

// About Us & Subpages
Route::get('/about/{slug?}', [AboutController::class, 'show'])->name('about');

// Our Presence
Route::get('/presence', [PresenceController::class, 'index'])->name('presence');

// Career & Engagements
Route::get('/career/recruitment', [CareerController::class, 'recruitment'])->name('career.recruitment');
Route::get('/career/tenders', [CareerController::class, 'tenders'])->name('career.tenders');
