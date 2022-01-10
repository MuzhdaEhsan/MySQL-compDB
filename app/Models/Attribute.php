<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    /**
     * Hidden attributes for serialization.
     *
     * @var array
     */
    protected $hidden = ['pivot'];

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
