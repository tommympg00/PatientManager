<?php

namespace App\Services;

interface StorageServiceInterface
{
    public function store($document, $directory);
}
