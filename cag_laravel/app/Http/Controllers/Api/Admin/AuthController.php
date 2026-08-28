<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminUser;
use Illuminate\Support\Facades\Hash;
use App\Models\AdminAuditLog;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = AdminUser::where('username', $request->username)
            ->where('is_active', true)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json(['error' => 'Invalid username or password'], 401);
        }

        // Update last_login
        $user->last_login = now();
        $user->save();

        // Audit Log
        AdminAuditLog::create([
            'user_id' => $user->id,
            'action' => 'LOGIN',
            'table_name' => 'admin_users',
            'record_id' => (string) $user->id,
            'ip_address' => $request->ip(),
            'new_data' => json_encode(['login_timestamp' => now()]),
            'created_at' => now(),
        ]);

        return response()->json([
            'id' => $user->id,
            'name' => $user->full_name,
            'email' => $user->email,
            'username' => $user->username,
            'role' => $user->role,
        ]);
    }
}
