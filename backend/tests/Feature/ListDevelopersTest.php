<?php

namespace Tests\Feature;

use App\Models\Developer;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class ListDevelopersTest extends TestCase
{
    use RefreshDatabase;
    use DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();

        Developer::factory()->create(['name' => 'John Doe']);
    }


    public function test_get_success()
    {
        $response = $this->get(route('api.developers.list'), ['X-Requested-With' => 'XMLHttpRequest']);

        $response->assertStatus(Response::HTTP_OK);
    }


    public function test_search_by_name()
    {
        $response = $this->get(route('api.developers.list', ['q' => 'John']), ['X-Requested-With' => 'XMLHttpRequest']);

        $response->assertStatus(Response::HTTP_OK);
    }


    public function test_search_by_name_not_found()
    {
        $response = $this->get(route('api.developers.list', ['q' => 'Jane']), ['X-Requested-With' => 'XMLHttpRequest']);

        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
