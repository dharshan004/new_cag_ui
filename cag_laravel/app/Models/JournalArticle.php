<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JournalArticle extends Model
{
    protected $table = 'cag_new.journal_articles';
    protected $guarded = [];

    public function issue()
    {
        return $this->belongsTo(JournalIssue::class, 'issue_id');
    }
}
