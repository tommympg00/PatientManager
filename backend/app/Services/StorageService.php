<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class StorageService implements StorageServiceInterface
{
    public function store($document, $directory)
    {
        //TodO Check
        $path = Storage::disk()->put($directory, $document);
        return Storage::disk()->url($path);
    }
}
