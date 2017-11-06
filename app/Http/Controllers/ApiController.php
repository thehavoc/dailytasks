<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use Auth;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\AddTaskRequest;
use App\Http\Requests\AddQuickTaskRequest;
use App\Http\Requests\UserRequest;

class ApiController extends Controller
{
	/**
	 * Get all tasks of a user
	 *
	 * @return Collection
	 */	
	public function getTasks(Request $request) 
	{	        
		return Auth::user()->tasks()->where('added_to', $request->date)->get();    	
	}	

	/**
	 * Update a task
	 *
	 * @param UpdateTaskRequest $request
	 * @param Task $task
	 * @return Collection
	 */	
	public function updateTask(UpdateTaskRequest $request, Task $task) 
	{	
		$task->update($request->all());
		return $task;    	
	}	

	/**
	 * Add a task
	 *
	 * @param AddTaskRequest $request
	 * @param Task $task
	 * @return Collection
	 */ 
	public function addTask(AddTaskRequest $request, Task $task) 
	{   
		$request['user_id'] = Auth::id();
		$task = $task->create($request->all());
		return $task;
	} 

	/**
	 * Add a quick task
	 *
	 * @param AddQuickTaskRequest $request
	 * @param Task $task
	 * @return Collection
	 */ 
	public function addQuickTask(AddQuickTaskRequest $request, Task $task) 
	{   
		$request['user_id'] = Auth::id();
		$task = $task->create($request->all());
		return $task;
	} 

	/**
	 * Remove a task
	 *
	 * @param UserRequest $request
	 * @param Task $task
	 */	
	public function deleteTask(UserRequest $request, Task $task) 
	{	
		$task->delete($task->id);
	}

	/**
	 * Edit a task
	 *
	 * @param Request $request
	 * @param Task $task
	 * @return Collection
	 */	
	public function editTask(Request $request, Task $task) 
	{	
		
		return $task;
	}	

}
