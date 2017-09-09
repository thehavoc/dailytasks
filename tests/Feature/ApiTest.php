<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Task;
use App\User;
Use Hash;
use Auth;

class ApiTest extends TestCase
{
	/**
	 * The task that is used by the tests
	 *
	 * @var App\Task
	 */	
	protected $task;

	/**
	 * The user that is used by the tests
	 *
	 * @var App\User
	 */	
	protected $user;


	/**
	 * Set up the dummy data
	 *
	 */	
	public function setUp() {
		parent::setUp();	

		$this->setUser();
	}

	/**
	 * Test the getTasks API method
	 *
	 * @return void
	 */
	public function testGetDailyTasks()
	{	

		$this->setTask();

		$response = $this->json('GET', 'api/tasks/' . $this->getDate());   	

        $this->task->delete();

        $response
            ->assertStatus(200)
            ->assertJson([$this->task->toArray()]);

	}

	/**
	 * Test adding a task by using the addTask API method
	 *
	 * @return void
	 */
	public function testAddTask()
	{		

		$data = $this->getExampleTaskData();

		$response = $this->json('POST', 'api/addTask', $data);

		$new_task = json_decode($response->getContent());

		Task::find($new_task->id)->delete();

        $response
            ->assertStatus(200)
            ->assertJson($data);

	}	

	/**
	 * Add a task and then test the updateTask API method
	 *
	 * @return void
	 */
	public function testUpdateTask()
	{		

		$this->setTask();

		$this->task->title = str_random(40);

		$response = $this->json('PATCH', 'api/updateTask/' . $this->task->id, $this->task->toArray());

		$this->task->delete();

        $response
            ->assertStatus(200)
            ->assertJson($this->task->toArray());

	}	

	/**
	 * Provide an example task
	 * 
	 * @return object
	 */	
	protected function getTask() {
		return $this->task;
	}

	/**
	 * Provide an example user
	 * 
	 * @return object
	 */	
	protected function getUser() {
		return $this->user;
	}

	/**
	 * Add an example task to the database
	 *
	 */	
	protected function setTask() 
	{	

		$data = $this->getExampleTaskData();

		$this->task = Task::create($data);
	}	

	/**
	 * Add an example user to the database
	 *
	 */	
	protected function setUser() 
	{	
		Auth::logout();

		$data = [
			'email' => str_random(40) . '@example.com',
			'password' => Hash::make(str_random(40)),
			'name' => str_random(40)
		];

		$this->user = User::create($data);

		Auth::login($this->user);

		return $this->user;
	}

	/**
	 * Get dummy task data
	 *
	 * @return array
	 */	
	protected function getExampleTaskData() 
	{	
		$data = [
			'user_id' => $this->getUser()->id,
			'added_to' => $this->getDate(),
			'completed' => 0,
			'title' => str_random(40)
		];

		return $data;		
	}	

	/**
	 * Get the current date in a suitable time format
	 *
	 * @return string
	 */	
	protected function getDate() 
	{	
		return date('Y-m-d');
	}	

	/**
	 * Destroy the dummy data
	 *
	 */	
	function tearDown() {		
		Auth::logout();
		$this->user->delete();
	}

}
