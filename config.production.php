<?php

return [
    'production' => true,
//    'baseUrl' => 'https://www.entruempelung-berlin-umgebung.de',
    'baseUrl' => 'https://entruempelung-berlin-umgebung.netlify.app',
    'title' => 'Entrümpelung in Berlin und Umgebung',
    'description' => '',
    'active' => function ($page, $section) {
        return Str::contains($page->getPath(), $section) ? 'active' : '';
    },
    'collections' => [],
];
