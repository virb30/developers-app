<?php

namespace Tests\Feature;

use App\Models\Developer;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class ShowDeveloperTest extends TestCase
{
    use DatabaseMigrations;
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->developer = Developer::create([
            'name' => 'John Doe',
            'birth_date' => '1992-06-30',
            'gender' => 'm',
            'hobby' => 'data science'
        ]);
    }


    public function test_get_success()
    {
        $response = $this->get(
            route('api.developers.show', ['developer' => $this->developer->id]),
            ['X-Requested-With' => 'XMLHttpResponse']
        );

        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure(['nome', 'idade', 'sexo', 'datanascimento', 'hobby']);
    }


    public function test_get_not_found()
    {
        $response = $this->get(
            route('api.developers.show', ['developer' => 404]),
            ['X-Requested-With' => 'XMLHttpResponse']
        );

        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
