<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditReportFile extends Model
{
    protected $table = 'cag_new.audit_report_files';

    protected $guarded = [];

    public function auditReport()
    {
        return $this->belongsTo(AuditReport::class, 'audit_report_id');
    }
}
