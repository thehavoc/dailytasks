<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use Auth;

class TaskController extends Controller
{
	/*
	|--------------------------------------------------------------------------
	| Tasks Controller
	|--------------------------------------------------------------------------
	|
	| This controller shows the edit and create task pages.
	|
	*/  

	/**
	 * Show the form for creating a task.
	 *
	 * @return view
	 */
	public function create()
	{
		$data['title'] = 'Add a Task';

		return view('add-task', $data);
	}

	/**
	 * Show the form for editing a task.
	 *
	 * @param  \App\Task  $task
	 * @return view
	 */
	public function edit(Task $task)
	{
		if(Auth::id() !== $task->user_id) {
			return abort('403');
		}

		$data['title'] = 'Edit Task';

		return view('edit-task', $data);        
	}
}
