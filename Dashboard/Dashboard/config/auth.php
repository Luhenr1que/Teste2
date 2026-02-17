<?php
return [
    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'admin' => [
            'driver' => 'session',
            'provider' => 'adms',
        ],
        'ong' => [
            'driver' => 'session',
            'provider' => 'ongs',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
        'adms' => [
            'driver' => 'eloquent',
            'model' => App\Models\ModelsAdm\Admin::class
        ],
        'ongs' => [
            'driver' => 'eloquent',
            'model' => App\Models\ModelsOng\OngModel::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        'adms' => [
            'provider' => 'adms',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
