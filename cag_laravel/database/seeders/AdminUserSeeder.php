<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AdminUser;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = AdminUser::where('username', 'admin')->first();
        if ($user) {
            $user->password_hash = Hash::make('admin');
            $user->save();
        } else {
            AdminUser::create([
                'username' => 'admin',
                'email' => 'admin@cag.gov.in',
                'full_name' => 'CAG Admin Coordinator',
                'role' => 'super_admin',
                'password_hash' => Hash::make('admin'),
                'is_active' => true,
            ]);
        }
    }
}
