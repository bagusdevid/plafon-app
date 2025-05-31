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
Route::middleware([\App\Http\Middleware\CheckDomainIsValid::class, 'auth'])->group(function () {
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/vip', [\App\Http\Controllers\VipController::class, 'index']);

    Route::get('/wallet', [\App\Http\Controllers\WalletController::class, 'index']);
    Route::post('/wallet/addBank', [\App\Http\Controllers\WalletController::class, 'addBank']);
    Route::put('/wallet/{id}', [\App\Http\Controllers\WalletController::class, 'update']);
    Route::delete('/wallet/{sheepBank}', [\App\Http\Controllers\WalletController::class, 'destroyBank']);

    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'index']);
    Route::get('/profile/edit', [\App\Http\Controllers\ProfileController::class, 'edit']);
    Route::match(['get','put'],'/profile/change-password', [\App\Http\Controllers\ProfileController::class, 'changePasswd']);
    Route::match(['get','post'],'/profile/change-avatar', [\App\Http\Controllers\ProfileController::class, 'changeAvatar']);
    Route::put('/profile/{id}', [\App\Http\Controllers\ProfileController::class, 'update']);
    Route::put('/profile/changeField/{id}', [\App\Http\Controllers\ProfileController::class, 'updateChangeField']);

    Route::get('/top-up', [\App\Http\Controllers\TopupController::class, 'index']);

    Route::get('/task/{id}', [\App\Http\Controllers\TaskController::class, 'detail']);
    Route::post('/task/getTaskCode', [\App\Http\Controllers\TaskController::class, 'getTaskCode']);
    Route::post('/task/bet', [\App\Http\Controllers\TaskController::class, 'bet']);

    Route::get('/withdraw', [\App\Http\Controllers\WithdrawController::class, 'index']);

    Route::get('/invite', [\App\Http\Controllers\InviteController::class, 'index']);

    Route::get('/customer-service', [\App\Http\Controllers\CustomerServiceController::class, 'index']);

    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});

Route::middleware('guest')->group(function () {
    Route::match(['get', 'post'], '/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
    Route::match(['get', 'post'], '/register', [\App\Http\Controllers\AuthController::class, 'register'])->name('register');
    Route::match(['get','post'],'/forgot-password', [\App\Http\Controllers\AuthController::class, 'forgotPassword']);
    Route::get('reset-password/{token}', [\App\Http\Controllers\AuthController::class, 'createResetPassword'])
        ->name('password.reset');
    Route::post('reset-password', [\App\Http\Controllers\AuthController::class, 'storeResetPassword'])
        ->name('password.store');
});

Route::match(['get', 'post'],'/site-activation', [\App\Http\Controllers\AuthController::class, 'siteActivation'])
    ->withoutMiddleware(\App\Http\Middleware\CheckDomainIsValid::class);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

//require __DIR__.'/auth.php';
