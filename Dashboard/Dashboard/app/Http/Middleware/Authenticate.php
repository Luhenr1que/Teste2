<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request)
    {
        if (! $request->expectsJson()) {
        // Verifica se a rota pertence à ONG
        if ($request->is('ong*')) {
            return route('ong.login-pagina'); // rota do login de ONG
        }

        // Padrão para admin
        return route('admin.login');
    }
    }
}
