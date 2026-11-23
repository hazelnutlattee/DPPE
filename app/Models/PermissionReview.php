<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermissionReview extends Model
{
    protected $fillable = [
        'user_id',
        'permission1',
        'permission2',
        'permission3',
        'permission4',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}