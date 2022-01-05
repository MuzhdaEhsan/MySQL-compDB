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
        // Fake admin user
        User::factory(1)->create([
            'name' => 'John Doe',
            'email' => 'admin@competency.ca',
            'is_admin' => true,
            'password' => bcrypt('password')
        ]);

        // Fake normal user
        User::factory(1)->create([
            'name' => 'Jane Doe',
            'email' => 'staff@competency.ca',
            'is_admin' => false,
            'password' => bcrypt('password')
        ]);
    }
}
