<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $guarded = [];

    public function cashier()
    {
        return $this->belongsTo(User::class);
    }
}
