<!DOCTYPE html>
<html lang="{{ $page->language ?? 'de' }}">
    <head>
        <meta charset="utf-8">

        <title>{{ isset($title) ? $title : $page->title }}</title>
        <meta name="description" content="{{ isset($description) ? $description : $page->description }}">
        <meta name="keywords" content="Entrümpelung, Entsorgung, Sperrmüllentsorgung, Büroauflösung, Wohnungsauflösung, Berlin, Umgebung, Kleintransporte, Umzug"/>

        <link rel="icon" type="image/png" href="/assets/img/favicon.png">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link rel="canonical" href="{{ $page->getUrl() }}">

        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/css/fontawesome.css">
        <link rel="stylesheet" href="/assets/font/flaticon_flexitype.css">
        <link rel="stylesheet" href="/assets/css/animate.css">
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css">
        <link rel="stylesheet" href="/assets/css/magnific-popup.css">
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
        <script src="/assets/js/progressbar.min.js"></script>
        <script src="/assets/js/jquery.magnific-popup.min.js"></script>
        <script src="/assets/js/swiper-bundle.min.js"></script>
        <script src="/assets/js/jquery.waypoints.min.js"></script>
        <script src="/assets/js/isotope.pkgd.min.js"></script>
        <script src="/assets/js/custom.js"></script>
    </body>
</html>
