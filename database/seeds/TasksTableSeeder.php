<?php

use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tasks')->insert([
            'title' => str_random(10),
            'added_to' => date('Y-m-d'),
            'completed' => (bool)random_int(0, 1),
            'user_id' => 1,
        ]);
    }
}
