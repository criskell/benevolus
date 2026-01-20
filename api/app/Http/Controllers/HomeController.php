<?php

namespace App\Http\Controllers;

final class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }
}
