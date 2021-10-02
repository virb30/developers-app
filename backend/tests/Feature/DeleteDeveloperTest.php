<?php

namespace Tests\Feature;

use App\Models\Developer;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class DeleteDeveloperTest extends TestCase
{
    use RefreshDatabase;
    use DatabaseMigrations;

    private Developer $developer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->developer = Developer::factory()->create();
    }

    public function test_delete_success()
    {
        $response = $this->delete(
            route('api.developers.delete', ['developer' => $this->developer->id]),
            [],
            ['X-Requested-With' => 'XMLHttpRequest']
        );

        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
