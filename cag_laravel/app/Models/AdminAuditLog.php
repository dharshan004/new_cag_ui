<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminAuditLog extends Model
{
    protected $table = 'cag_new.admin_audit_log';
    protected $guarded = [];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(AdminUser::class, 'user_id');
    }
}
