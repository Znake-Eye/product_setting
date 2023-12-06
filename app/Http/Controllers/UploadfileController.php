<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadfileController extends Controller
{
    //
    public function uploadFile(Request $request){
        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads'), $fileName);
        return "Upload successfully";
    }
}
