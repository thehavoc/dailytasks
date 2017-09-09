<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use Auth;
use App\Http\Requests\UpdateTaskRequest;

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
     * @param UserRequest $request
     * @param Task $task
     * @return Collection
     */ 
    public function addTask(Request $request, Task $task) 
    {   
        $request['user_id'] = Auth::id();
        $task = $task->create($request->all());
        return $task;
    }      

}