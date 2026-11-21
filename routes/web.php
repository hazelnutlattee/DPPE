<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // Pastikan ini di-import jika menggunakan Route::get

// Route untuk Home Page (Welcome)
Route::inertia('/', 'welcome')->name('home');

// Route untuk About & Help Page
Route::inertia('/about', 'about')->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';