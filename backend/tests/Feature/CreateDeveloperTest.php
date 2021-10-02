<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class CreateDeveloperTest extends TestCase
{
    use RefreshDatabase;
    use DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_post_success()
    {
        $response = $this->post(route('api.developers.store'), [
            'name' => 'John Doe',
            'birth_date' => '1992-06-30',
            'gender' => 'm',
            'hobby' => 'data science'
        ], ['X-Requested-With' => 'XMLHttpRequest']);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function test_post_bad_request()
    {
        $response = $this->post(route('api.developers.store'), [
            'name' => '',
            'birth_date' => '25456456',
            'gender' => 'h',
            'hobby' => ''
        ], ['X-Requested-With' => 'XMLHttpRequest']);

        $response->assertStatus(Response::HTTP_BAD_REQUEST);
    }
}
