<?php

use Illuminate\Support\Str;

return [
    'production' => true,
//    'baseUrl' => 'https://www.entruempelung-berlin-umgebung.de',
    'baseUrl' => 'https://entruempelung-berlin.netlify.app',
    'title' => 'Entrümpelung in Berlin und Umgebung',
    'description' => '',
    'active' => function ($page, $section) {
        return Str::contains($page->getPath(), $section) ? 'active' : '';
    },
    'collections' => [],
];
