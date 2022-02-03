<?php

namespace Database\Seeders;

use App\Models\Competency;
use App\Models\Course;
use App\Models\Knowledge;
use App\Models\Skill;
use App\Models\User;
use App\Models\Attribute;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(Faker $faker)
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

        // Seed dummy data
        for ($i = 0; $i < 100; $i++) {
            $level = '';
            switch($i % 3) {
                case 0:
                    $level = 'B';
                    break;
                case 1:
                    $level = 'I';
                    break;    
                case 2:
                    $level = 'D';
                    break;
                default:
                    break;
            }

            Competency::factory()->create([
                'code' => ($i % 2 === 0 ? 'T' : 'F') . $level . sprintf('%04d', $i)
            ]);
        }

        function getRandomCompetencyIDs()
        {
            $competencies = Competency::all();
            $numberOfCompetencies = rand(1, 5);
            $randomIDs = [];

            for ($i = 0; $i < $numberOfCompetencies; $i++) {
                $randomIDs[$i] = $competencies[rand(0, count($competencies) - 1)]->id;
            }

            return array_unique($randomIDs);
        }

        for ($i = 0; $i < count(Competency::all()); $i++) {
            Course::factory()->create([
                'code' => 'C' . sprintf('%04d', $i),
            ])->competencies()->attach(getRandomCompetencyIDs());

            Attribute::factory()->create([
                'code' => 'A' . sprintf('%04d', $i),
            ])->competencies()->attach(getRandomCompetencyIDs());

            Knowledge::factory()->create([
                'code' => 'K' . sprintf('%04d', $i),
            ])->competencies()->attach(getRandomCompetencyIDs());

            Skill::factory()->create([
                'code' => 'S' . sprintf('%04d', $i),
            ])->competencies()->attach(getRandomCompetencyIDs());
        }
    }
}
