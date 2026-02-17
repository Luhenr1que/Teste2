<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\ModelsNoticia\NoticiaModel as noticia;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('*', function ($view) {
            $view->with('notificacaoNovas', Noticia::where('vistoNoticia', 0)->where('StatusNoticia', 'analise')->orderBy('idNoticia', 'desc')->get());
        });
    }
}
