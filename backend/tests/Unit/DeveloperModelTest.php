<?php

namespace Tests\Unit;

use App\Models\Developer;
use DateTimeImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeveloperModelest extends TestCase
{
    private Developer $developer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->developer = new Developer([
            'name' => 'John Doe',
            'birth_date' => new DateTimeImmutable('1992-06-30'),
            'gender' => 'm',
            'hobby' => 'data science'
        ]);
    }

    public function test_gender_should_be_uppercase()
    {
        $this->assertEquals('M', $this->developer->gender);
    }


    public function test_calculate_developer_age()
    {
        $this->assertEquals(29, $this->developer->age);
    }
}
