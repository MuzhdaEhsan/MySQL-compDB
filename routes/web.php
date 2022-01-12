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

    Route::middleware(['admin'])->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('logs', LogController::class);

        // Those routes must come first before the resources, otherwise if user goes to /competencies/trashed
        // the app will break as it tries to find a competency with ID "trashed" instead
        Route::prefix('competencies')->group(function () {
            Route::get('trashed', [CompetencyController::class, 'trashed']);
            Route::delete('{id}/force-delete', [CompetencyController::class, 'forceDelete']);
            Route::post('{id}/restore', [CompetencyController::class, 'restore']);
        });

        // TODO: force delete and restore routes for other resources
    });

    // TODO: Modify index pages of other resources to match competency index page
    // Resource controllers https://laravel.com/docs/8.x/controllers#resource-controllers 
    Route::resource('competencies', CompetencyController::class);
    Route::resource('attributes', AttributeController::class);
    Route::resource('skills', SkillController::class);
    Route::resource('knowledge', KnowledgeController::class);
    Route::resource('courses', CourseController::class);

    // Use this custom prefix route instead of placing them in api.php is because
    // we are using session-based authentication while api.php is for stateless requests
    // Using this route we can ensure that only authenticated users can access the APIs
    Route::prefix('stateful-api')->group(function () {
        Route::get('search', [SearchController::class, '__invoke']);
    });
});
