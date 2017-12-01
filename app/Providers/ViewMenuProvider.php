<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use View;
use Auth;

class ViewMenuProvider extends ServiceProvider
{
	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->getRightMainMenu();
		$this->getLeftMainMenu();
		$this->getProfileMainMenu();
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{

	}

	/**
	 * Get the right main menu items.
	 *
	 * @return void
	 */	
	private function getRightMainMenu() 
	{	
		$items = [
			[
				'route' => 'login',
				'label' => 'Login'
			],
			[
				'route' => 'register',
				'label' => 'Register'                
			]

		];

		View::share('rightMainNav', json_encode($items));		
	}

	/**
	 * Get the left main menu items.
	 *
	 * @return void
	 */	
	private function getLeftMainMenu() 
	{	
		$items = [
			[
				'route' => 'addTask',
				'label' => 'Add Task'
			]
		];

		View::share('leftMainNav', json_encode($items));		
	}	

	/**
	 * Get the profile main menu items.
	 *
	 * @return void
	 */	
	private function getProfileMainMenu() 
	{	
		$items = [
			[
				'route' => 'logout',
				'label' => 'Logout',
				'event' => 'logout',
			]
		];

		View::share('profileMainMenu', json_encode($items));		
	}	

}
