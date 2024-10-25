<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class StorageService implements StorageServiceInterface
{
    protected $disk;

    public function __construct($disk = 's3')
    {
        $this->disk = $disk;
    }

    public function store($document, $directory)
    {
        $path = Storage::disk($this->disk)->put($directory, $document);
        return Storage::disk($this->disk)->url($path);
    }
}
