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
            $currentPath = trim((string) parse_url($page->getUrl(), PHP_URL_PATH), '/');
            $isHomePage = $currentPath === '';
        @endphp

        <title>{{ $metaTitle }}</title>
        <meta name="description" content="{{ $metaDescription }}">
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

        <link rel="preload" href="/assets/font/flaticon_flexitype.woff2" as="font" type="font/woff2" crossorigin>
        @if($isHomePage)
            <link rel="preload" href="/assets/img/entruempelung.jpg" as="image">
        @endif

        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/css/fontawesome-subset.css">
        <link rel="stylesheet" href="/assets/font/flaticon_flexitype.css">
        <link rel="stylesheet" href="/assets/css/animate.css">
        @if(isset($needsSwiper) && $needsSwiper)
            <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css">
        @endif
        <link rel="stylesheet" href="/assets/css/style.css">
    </head>
    <body>
        <x-mobile-menu />
        <div class="menu__bar-popup-overlay"></div>
        @include('_components.navbar')

        @yield('body')

        <x-footer />

        <script src="/assets/js/vendor/bootstrap.min.js" defer></script>
        <script src="/assets/js/vendor/popper.min.js" defer></script>
        @if(isset($needsSwiper) && $needsSwiper)
            <script src="/assets/js/vendor/swiper-bundle.min.js" defer></script>
        @endif
        <script src="/assets/js/menu.js" defer></script>
        <script src="/assets/js/slider.js" defer></script>
        <script src="/assets/js/form.js" defer></script>
    </body>
</html>
