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
    public function getTasks() 
    {	
		return Auth::user()->tasks()->get();    	
    }	

    /**
     * Update a task
     *
     * @param UserRequest $request
     * @return bool
     */	
    public function updateTask(UpdateTaskRequest $request, Task $task) 
    {	
        $task->update($request->all());
        return $task;    	
    }	

}
