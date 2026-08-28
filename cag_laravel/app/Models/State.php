<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $table = 'cag_new.states';
    protected $guarded = [];

    public function offices()
    {
        return $this->hasMany(Office::class, 'state_id');
    }
}
