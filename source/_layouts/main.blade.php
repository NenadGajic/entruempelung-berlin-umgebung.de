<!DOCTYPE html>
<html lang="{{ $page->language ?? 'de' }}">
    <head>
        <meta charset="utf-8">
        @php
            $metaTitle = isset($title) ? $title : $page->title;
            $metaDescription = isset($description) ? $description : $page->description;
            $metaImagePath = isset($ogImage) ? $ogImage : ($page->ogImage ?? '/assets/img/entruempelung.jpg');
            $metaImage = \Illuminate\Support\Str::startsWith($metaImagePath, ['http://', 'https://'])
                ? $metaImagePath
                : rtrim($page->baseUrl, '/') . $metaImagePath;
        @endphp

        <title>{{ $metaTitle }}</title>
        <meta name="description" content="{{ $metaDescription }}">
        <meta name="keywords" content="Entrümpelung, Entsorgung, Sperrmüllentsorgung, Büroauflösung, Wohnungsauflösung, Berlin, Umgebung, Kleintransporte, Umzug"/>

        <link rel="icon" type="image/png" href="/assets/img/favicon.png">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link rel="canonical" href="{{ $page->getUrl() }}">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="{{ $page->locale ?? 'de_DE' }}">
        <meta property="og:site_name" content="{{ $page->title }}">
        <meta property="og:title" content="{{ $metaTitle }}">
        <meta property="og:description" content="{{ $metaDescription }}">
        <meta property="og:url" content="{{ $page->getUrl() }}">
        <meta property="og:image" content="{{ $metaImage }}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $metaTitle }}">
        <meta name="twitter:description" content="{{ $metaDescription }}">
        <meta name="twitter:image" content="{{ $metaImage }}">
        @include('_components.structured-data')

        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/css/fontawesome-subset.css">
        <link rel="stylesheet" href="/assets/font/flaticon_flexitype.css">
        <link rel="stylesheet" href="/assets/css/animate.css">
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css">
        <link rel="stylesheet" href="/assets/css/utilities.css">
        <link rel="stylesheet" href="/assets/css/style.css">
    </head>
    <body>
        <x-mobile-menu />
        <div class="menu__bar-popup-overlay"></div>
        @include('_components.navbar')

        @yield('body')

        <x-footer />

        <script src="/assets/js/jquery-3.7.1.min.js"></script>
        <script src="/assets/js/bootstrap.min.js"></script>
        <script src="/assets/js/popper.min.js"></script>
        <script src="/assets/js/swiper-bundle.min.js"></script>
        <script src="/assets/js/custom.js"></script>
    </body>
</html>
