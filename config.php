<?php

use Illuminate\Support\Str;

return [
    'production' => false,
    'baseUrl' => 'http://localhost:8000',
    'title' => 'Entrümpelung in Berlin und Umgebung',
    'description' => '',
    'active' => function ($page, $section) {
        return Str::contains($page->getPath(), $section) ? 'active' : '';
     },
    'collections' => [],
];
