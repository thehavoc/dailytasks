<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    /**
     * The Task database table.
     *
     * @var string
     */	
	protected $table = "tasks";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $fillable = [
		'completed', 'title', 'added_to', 'user_id', 'description', 'time_slot'
	];

    /**
     * Get the user that owns the task.
     *
     * @var string
     */	
	public function user(){
		return $this->belongsTo("User");
	}

}
