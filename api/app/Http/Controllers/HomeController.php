<?php
declare(strict_types=1);

namespace App\Http\Controllers;

final class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }
}
