<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Lucky Armansyah Muftiawan',
            'email' => 'luckyarmansyah@gmail.com',
            'email_verified_at' => now(),
            'password' => 'secret',
            'role' => 0
        ]);
        User::create([
            'name' => 'Lucky Armansyah Muftiawan',
            'email' => 'admin@laundry.com',
            'email_verified_at' => now(),
            'password' => 'secret',
            'role' => 1
        ]);
        User::create([
            'name' => 'Lucky Armansyah Muftiawan',
            'email' => 'owner@laundry.com',
            'email_verified_at' => now(),
            'password' => 'secret',
            'role' => 2
        ]);
        User::create([
            'name' => 'Lucky Armansyah Muftiawan',
            'email' => 'cashier@laundry.com',
            'email_verified_at' => now(),
            'password' => 'secret',
            'role' => 3
        ]);
    }
}
