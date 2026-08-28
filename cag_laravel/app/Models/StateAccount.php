<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StateAccount extends Model
{
    protected $table = 'cag_new.state_accounts';
    protected $guarded = [];

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id');
    }
}
