<?php

namespace Tests\Feature;

use App\Models\Developer;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class UpdateDeveloperTest extends TestCase
{
    use RefreshDatabase;
    use DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();

        $this->developer = Developer::factory()->create();
    }

    public function test_example()
    {
        $response = $this->put(
            route('api.developers.update', ['developer' => $this->developer->id]),
            [
                'name' => 'John Doe 2',
                'birth_date' => $this->developer->birth_date,
                'hobby' => $this->developer->hobby,
                'gender' => $this->developer->gender
            ],
            ['X-Requested-With' => 'XMLHttpRequest']
        );

        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure(['nome', 'id', 'sexo', 'hobby', 'datanascimento', 'idade']);
        $this->assertDatabaseHas('developers', ['name' => 'John Doe 2'], 'mysql');
    }
}
