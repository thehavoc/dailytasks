<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class WebRoutesTest extends TestCase
{
    /**
     * Test the redirect for non logged-in users
     *
     * @return void
     */
    public function testRedirectForNonLoggedinUsers()
    {
    	$response = $this->get('/');

        $response->assertRedirect('/login');
    }
}
