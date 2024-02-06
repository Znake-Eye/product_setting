<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function Register(Request $request){
        $validate = $request->validate([
            'username' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);
        
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'sex' => $request->sex,
            'age' => $request->age,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'admin'
        ]);
        if($user){
            $authToken = $user->createToken('auth-token')->plainTextToken;
            Auth::login($user);
            return response()->json(['access_token' => $authToken, 'user' => $user]);
        }
        else{
            return ['status' => false, 'message' => 'failed to create user'];
        }
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]); 
        if(Auth::attempt($credentials)){
           $user = User::where('email',$request->email)->first();
           Auth::login($user);
           $authToken = $user->createToken('auth-token')->plainTextToken;
            return response()->json(['status' =>true,'access_token' => $authToken, 'user' => $user]);
        }
        return ['status' => false, 'message' => 'do not match record'];
    
    }
    public function getUser(Request $request){
        return User::all();
    }


    
    


}
