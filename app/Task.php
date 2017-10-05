<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	protected $table = "tasks";

	protected $fillable = ['completed', 'title', 'added_to', 'user_id', 'description', 'time_slot'];
	
	public function user(){
		return $this->belongsTo("User");
	}

}
