<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Services\StorageServiceInterface;
use App\Services\StorageService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(StorageServiceInterface::class, function ($app) {
            return new StorageService('s3');
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
