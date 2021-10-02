<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;

    protected $connection = 'mysql';
    protected $table = "developers";

    protected $fillable = [
        'name',
        'gender',
        'hobby',
        'birth_date'
    ];

    protected $appends = [
        'age'
    ];

    protected $casts = [
        'birth_date'
    ];

    protected $dates = [
        'birth_date'
    ];


    public function getAgeAttribute()
    {
        return $this->birth_date->diffInYears(now());
    }

    public function setGenderAttribute(string $gender)
    {
        $this->attributes['gender'] = strtoupper(substr($gender, 0, 1));
    }
}
