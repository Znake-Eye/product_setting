<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UploadfileController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/uploadfile', [UploadfileController::class, 'uploadFile']);

Route::post('/uploadfile', [UploadfileController::class, 'uploadFile']);
// Route::post('createUser', [UserController::class, 'createUser']);
Route::post('login', [UserController::class, 'login']);

Route::post('/register', [UserController::class, 'Register']);

// Route::middleware(['auth:sanctum'])->group(function () {
//     // Your protected routes go here
    
   
   
    
// });

Route::get('getUser', [UserController::class, 'getUser']);