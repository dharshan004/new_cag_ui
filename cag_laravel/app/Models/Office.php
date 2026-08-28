<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $table = 'cag_new.offices';
    protected $guarded = [];

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id');
    }
}
