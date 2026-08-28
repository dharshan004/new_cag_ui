<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class AdminUser extends Authenticatable
{
    use Notifiable;

    protected $table = 'cag_new.admin_users';

    protected $guarded = [];

    protected $hidden = [
        'password_hash',
        'remember_token',
    ];

    public function getAuthPasswordName()
    {
        return 'password_hash';
    }
}
