<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'short_name' => $this->faker->sentence(3, false),
            'statement' => $this->faker->sentence(10),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
