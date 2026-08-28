<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JournalIssue extends Model
{
    protected $table = 'cag_new.journal_issues';
    protected $guarded = [];

    public function articles()
    {
        return $this->hasMany(JournalArticle::class, 'issue_id');
    }
}
