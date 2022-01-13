<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    const CREATE = 'create';
    const UPDATE = 'update';
    const DELETE = 'delete';
    const RESTORE = 'restore';
    const FORCE_DELETE = 'force_delete';

    const TABLE_ATTRIBUTES = 'attributes';
    const TABLE_COMPETENCIES = 'competencies';
    const TABLE_COURSES = 'courses';
    const TABLE_KNOWLEDGE = 'knowledge';
    const TABLE_SKILLS = 'skills';

    /**
     * Default attributes.
     *
     * @var array
     */
    protected $attributes = [
        'old_state' => null,
        'new_state' => null
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'action',
        'table_name',
        'record_id',
        'new_state',
        'old_state'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'old_state' => 'array',
        'new_state' => 'array'
    ];
}
