<?php

use Illuminate\Support\Str;

return [
    'production' => false,
    'baseUrl' => 'https://entruempelung-berlin-umgebung.de',
    'title' => 'Entrümpelung in Berlin und Umgebung',
    'description' => 'Website description.',
    'active' => function ($page, $section) {
        return Str::contains($page->getPath(), $section) ? 'active' : '';
     },
    'collections' => [],
];
