<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PermissionReviewController;
use Inertia\Inertia;

// Route untuk Home Page
Route::inertia('/', 'welcome')->name('home');

// Route untuk About & Help Page
Route::inertia('/about', 'about')->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Permission Review Routes
    Route::post('/permission-reviews', [PermissionReviewController::class, 'store']);
    Route::get('/my-reviews', [PermissionReviewController::class, 'index']);
    Route::delete('/permission-reviews/{id}', [PermissionReviewController::class, 'destroy']);

    // Permission Workbench Page
    Route::inertia('permission-workbench', 'permission-workbench')
        ->name('permission-workbench');
});

require __DIR__ . '/settings.php';