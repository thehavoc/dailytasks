<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller shows the main home page.
	|
	*/  

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$data['title'] = 'Tasks';

		return view('home', $data);
	}
}
