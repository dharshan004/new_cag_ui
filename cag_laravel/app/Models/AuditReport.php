<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditReport extends Model
{
    protected $table = 'cag_new.audit_reports';

    protected $guarded = [];

    public function governmentType()
    {
        return $this->belongsTo(GovernmentType::class, 'government_type_id');
    }

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id');
    }

    public function files()
    {
        return $this->hasMany(AuditReportFile::class, 'audit_report_id');
    }
}
