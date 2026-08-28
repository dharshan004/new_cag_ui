<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgOfficer extends Model
{
    protected $table = 'cag_new.org_officers';
    protected $guarded = [];

    public function designation()
    {
        return $this->belongsTo(OrgDesignation::class, 'designation_id');
    }
}
