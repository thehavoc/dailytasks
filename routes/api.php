<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('tasks/{date}', 'ApiController@getTasks');
Route::patch('updateTask/{task}', 'ApiController@updateTask');
Route::post('addQuickTask', 'ApiController@addQuickTask');
