<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $resultsPerPage = $request->query('resultsPerPage') ?? 10;
        $orderBy = $request->query('orderBy') ?? 'id';
        $orderByType = $request->query('orderByType') ?? 'asc';

        $users = User::orderBy($orderBy, $orderByType)->paginate($resultsPerPage)->withQueryString();
       
        return view('auth.index', compact('users'));
    }

    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('auth.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['string', 'required'],
            'email_address' => ['required', 'email'],
            'user_password' => ['required', 'min:6'],
            'password_confirm' => ['required_with:user_password', 'same:user_password', 'min:6'],
        ]);

        //print_r($request->input('user_password')); exit;
       
        // Create a new User record
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email_address'),
            'is_admin' => $request->input('role'),
            'password' => bcrypt($request->input('user_password')),
            'remember_token' => $request->input('token')
        ]);


        //TODO: Log this event
        
        if ($request->expectsJson()) {
            return response()->json(['user' => $user]);
        }

        return redirect()
            ->action(
                [UserController::class, 'index']
            )->with(
                'status',
                "Successfully create a new user $user->name - $user->email"
            );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //print($user->is_admin); exit;
        return view('auth.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['string', 'required'],
            'email_address' => ['required', 'email'],
        ]);

        // update the record
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email_address'),
            'is_admin' => $request->input('role'),
        ]);

        if ($request->expectsJson()) {
            return response()->json(['user' => $user]);
        }

        return redirect()
            ->action(
                [UserController::class, 'index']
            )->with(
                'status',
                "Successfully updated user $user->name - $user->email"
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        // Get the code and short name of this record before deleting
        $name = $user->name;
        $email = $user->email;

        $user->delete();

        // Redirect to index page with flash message
        return redirect()
            ->action(
                [UserController::class, 'index']
            )->with(
                'status',
                "Successfully deleted User $name - $email"
            );
    }

    /**
     * Show the form for changing the password.
     *
     * @return \Illuminate\Http\Response
     */
    public function changePassword($id)
    {
        return view('auth.reset', compact('id'));
    }

    /**
     * 
     */
    public function UpdatePassword(Request $request, $id)
    {
        $user = User::all()->where('id', $id)->firstOrFail();
        
        $name = $user->name;
        $email = $user->email;

        $request->validate([
            'user_password' => ['required', 'min:6'],
            'password_confirm' => ['required_with:user_password', 'same:user_password', 'min:6'],
        ]);
        

        // update the record
        $user->update([
            'password' => bcrypt($request->input('user_password'))
        ]);

        if ($request->expectsJson()) {
            return response()->json(['user' => $user]);
        }

        return redirect()
            ->action(
                [UserController::class, 'index']
            )->with(
                'status',
                "Successfully updated password for user $name - $email"
            );
    }
}