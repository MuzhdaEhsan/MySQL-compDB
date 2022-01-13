<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attribute extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'short_name',
        'statement'
    ];

    /**
     * Hidden attributes for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'pivot',
        'attributes_index_col'
    ];

    /**
     * Parent competencies.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function competencies()
    {
        return $this->belongsToMany(Competency::class);
    }

    /**
     * Get related courses.
     *
     * @return array
     */
    public function getCourses()
    {
        $courses = [];

        foreach ($this->competencies as $competency) {
            foreach ($competency->courses as $course) {
                $courses[] = $course;
            }
        }

        return array_unique($courses);
    }
}
