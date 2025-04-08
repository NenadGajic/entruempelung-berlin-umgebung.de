<?php

use Illuminate\Support\Str;

return [
    'production' => true,
//    'baseUrl' => 'https://www.entruempelung-berlin-umgebung.de',
    'baseUrl' => 'https://entruempelung-berlin.netlify.app',
    'title' => 'Entrümpelung in Berlin und Umgebung',
    'description' => 'Wir sind Ihre Experten für schnelle und zuverlässige Entrümpelung in Berlin. Ob Möbel, Elektrogeräte oder großer Sperrmüll – wir entsorgen alles fachgerecht und umweltbewusst.',
    'active' => function ($page, $section) {
        return Str::contains($page->getPath(), $section) ? 'active' : '';
    },
    'collections' => [],
];
