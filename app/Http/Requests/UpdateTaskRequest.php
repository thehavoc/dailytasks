<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\UserRequest;

class UpdateTaskRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{

		$user_request = new UserRequest;

		$rules = [
			'id' => 'required',
			'title' => 'required',
		];

		$rules = $user_request->rules() + $rules;
		return $rules;
	}
}
