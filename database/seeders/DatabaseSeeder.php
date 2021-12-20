<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(1)->create([
            'name' => 'Admin',
            'email' => 'admin@competency.ca',
            'is_admin' => 1,
            'password' => bcrypt('password')
        ]);
    }
}
