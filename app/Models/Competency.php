<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Competency extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Hidden attributes for serialization.
     *
     * @var array
     */
    protected $hidden = ['pivot'];

    /**
     * Get related attributes. Cannot use 'attributes' because there is a default property called $attributes already.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function related_attributes()
    {
        return $this->belongsToMany(Attribute::class);
    }

    /**
     * Get related courses. 
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }

    /**
     * Get related knowledge. 
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function knowledge()
    {
        return $this->belongsToMany(Knowledge::class);
    }

    /**
     * Get related skills. 
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }
}
