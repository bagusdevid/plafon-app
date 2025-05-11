<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});
Route::middleware('auth')->group(function () {
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'index']);
    Route::get('/profile/edit', [\App\Http\Controllers\ProfileController::class, 'edit']);
    Route::get('/top-up', [\App\Http\Controllers\TopupController::class, 'index']);
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});

Route::match(['get','post'], '/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
Route::match(['get','post'], '/register', [\App\Http\Controllers\AuthController::class, 'register'])->name('register');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

require __DIR__.'/auth.php';
