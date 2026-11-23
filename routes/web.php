<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PermissionReviewController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    //saya tambah hok ni route untuk permission review
    Route::post('/permission-reviews', [PermissionReviewController::class, 'store']);
    Route::get('/my-reviews', [PermissionReviewController::class, 'index']);
    Route::delete('/permission-reviews/{id}', [PermissionReviewController::class, 'destroy']);
});

Route::inertia('permission-workbench', 'permission-workbench')
    ->name('permission-workbench');

require __DIR__ . '/settings.php';
