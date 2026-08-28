<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgDesignation extends Model
{
    protected $table = 'cag_new.org_designations';
    protected $guarded = [];

    public function parent()
    {
        return $this->belongsTo(OrgDesignation::class, 'parent_id');
    }

    public function officers()
    {
        return $this->hasMany(OrgOfficer::class, 'designation_id');
    }
}
