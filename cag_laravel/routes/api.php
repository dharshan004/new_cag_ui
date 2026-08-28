<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\FormerCagController;
use App\Http\Controllers\Api\OfficerController;
use App\Http\Controllers\Api\PresenceController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\Admin\AdminCrudController;
use App\Http\Controllers\Api\Admin\AdminOptionsController;
use App\Http\Controllers\Api\Admin\AdminUploadController;
use App\Http\Controllers\Api\Admin\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Frontend Endpoints
Route::get('/home', [HomeController::class, 'index']);
Route::get('/reports', [ReportController::class, 'index']);
Route::get('/reports/{id}', [ReportController::class, 'show']);
Route::get('/former-cags', [FormerCagController::class, 'index']);
Route::get('/officers', [OfficerController::class, 'index']);
Route::get('/presence', [PresenceController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);

// Admin Panel API Endpoints
Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/dashboard-stats', [AdminCrudController::class, 'dashboardStats']);
    Route::get('/crud', [AdminCrudController::class, 'index']);
    Route::post('/crud', [AdminCrudController::class, 'store']);
    Route::put('/crud', [AdminCrudController::class, 'update']);
    Route::delete('/crud', [AdminCrudController::class, 'destroy']);

    Route::get('/options', [AdminOptionsController::class, 'index']);
    Route::post('/upload', [AdminUploadController::class, 'upload']);
});
