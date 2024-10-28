<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class StorageService implements StorageServiceInterface
{
    public function store($directory, $document)
    {
        $path = Storage::disk()->put($directory, $document);

        $bucketName = env('MINIO_BUCKET');

        $partialPath = rtrim(Storage::disk()->url('/'), '/') . "/{$bucketName}/" . ltrim($path, '/');

        return $partialPath;
    }
}
