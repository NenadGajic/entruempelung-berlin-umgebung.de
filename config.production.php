<?php

use Illuminate\Support\Str;

return [
    'production' => true,
    'baseUrl' => 'https://entruempelung-berlin-umgebung.de',
    'locale' => 'de_DE',
    'title' => 'Entrümpelung in Berlin und Umgebung',
    'description' => 'Wir sind Ihre Experten für schnelle und zuverlässige Entrümpelung in Berlin. Ob Möbel, Elektrogeräte oder großer Sperrmüll – wir entsorgen alles fachgerecht und umweltbewusst.',
    'ogImage' => '/assets/img/entruempelung.jpg',
    'businessName' => 'Entrümpelung Berlin und Umgebung',
    'businessPhone' => '+49 177 3975560',
    'businessEmail' => 'office@entruempelung-berlin-umgebung.de',
    'businessServiceArea' => 'Berlin und Brandenburg',
    'businessImage' => '/assets/img/entruempelung.jpg',
    'services' => require __DIR__ . '/source/_data/services.php',
    'active' => function ($page, $section) {
        return Str::contains($page->getPath(), $section) ? 'active' : '';
    },
    'collections' => [],
];
