<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for($i = 0; $i < 10; $i++) {
            \App\Models\Patient::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'phone_number' => $faker->phoneNumber,
                'document_photo_path' => $faker->imageUrl(640, 480, 'people', true, null, false, 'jpg'),
            ]);
        }
    }
}
