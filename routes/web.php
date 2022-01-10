<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\CompetencyController;
use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\KnowledgeController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['register' => false]);

Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeController::class, 'index']);

    // Resource controllers https://laravel.com/docs/8.x/controllers#resource-controllers 
    Route::resource('competencies', CompetencyController::class);
    Route::resource('attributes', AttributeController::class);
    Route::resource('skills', SkillController::class);
    Route::resource('knowledge', KnowledgeController::class);
    Route::resource('courses', CourseController::class);

    Route::middleware(['admin'])->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('logs', LogController::class);
    });

    // Use this custom prefix route instead of placing them in api.php is because
    // we are using session-based authentication while api.php is for stateless requests
    // Using this route we can ensure that only authenticated users can access the APIs
    Route::prefix('stateful-api')->group(function () {
        Route::get('search', [SearchController::class, '__invoke']);
    });
});
