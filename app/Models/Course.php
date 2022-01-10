<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
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
}
