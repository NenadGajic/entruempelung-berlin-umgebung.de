@extends('_layouts.main')

@section('body')
    {{-- BANNER AREA --}}
    <div class="banner__one">
        <div class="banner swiper banner-slider">
            <div class="swiper-wrapper">
                <div class="banner__one-image swiper-slide" style="background-image: url('assets/img/banner/banner-1.png');">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="banner__one-content">
                                    <span class="subtitle " data-delay=".3s">Entrümpelung</span>
                                    <h1 data-animation="fadeInUp" data-delay=".6s">Unkomplizierte <span>Entrümpelung</span> in Berlin und Umgebung</h1>
                                    <p data-animation="fadeInUp" data-delay=".9s">Wir bieten Entrümpelungen von Wohnungen, Keller und  Häusern.</p>
                                    <div class="banner__one-content-button" data-animation="fadeInUp" data-delay="1.4s">
                                        <a class="default_button" href="#">Kostenlose Besichtigung vereinbaren <i class="flaticon-right-up"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="banner__one-image swiper-slide" style="background-image: url('assets/img/banner/banner-1.png');">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="banner__one-content">
                                    <span class="subtitle " data-delay=".3s">Entsorgung</span>
                                    <h1 data-animation="fadeInUp" data-delay=".6s">Unkomplizierte <span>Entsorgung</span> in Berlin und Umgebung</h1>
                                    <p data-animation="fadeInUp" data-delay=".9s">Wir entsorgen Bauschutt, Möbel, Sperrmüll und viel mehr!</p>
                                    <div class="banner__one-content-button" data-animation="fadeInUp" data-delay="1.4s">
                                        <a class="default_button" href="#">Kostenlose Besichtigung vereinbaren <i class="flaticon-right-up"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="banner__one-image swiper-slide" style="background-image: url('assets/img/banner/banner-1.png');">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="banner__one-content">
                                    <span class="subtitle " data-delay=".3s">Auflösung</span>
                                    <h1 data-animation="fadeInUp" data-delay=".6s">Unkomplizierte <span>Auflösung</span> in Berlin und Umgebung</h1>
                                    <p data-animation="fadeInUp" data-delay=".9s">Privat und Gewerbekunden! Haushaltsauflösung, Wohnungsauflösung, Kellerauflösung, Lagerauflösung, Gewerbeauflösung, Werkstattauflösung, Büroauflösung</p>
                                    <div class="banner__one-content-button" data-animation="fadeInUp" data-delay="1.4s">
                                        <a class="default_button" href="#">Kostenlose Besichtigung vereinbaren <i class="flaticon-right-up"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="banner__one-dots">
                <div class="banner-pagination"></div>
            </div>
        </div>
    </div>
    {{-- END BANNER AREA --}}

    {{-- SERVICES AREA --}}
    <div class="services__one overflow-hidden section-padding">
        <div class="bg_shape" style="background-image: url('assets/img/shape/bg.png');"></div>
        <div class="container">
            <div class="row mb-30">
                <div class="col-lg-12">
                    <div class="services__one-title t-center">
                        <span class="subtitle ">User Angebot</span>
                        <h2>Unsere Leistungen im Überblick</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6  mt-25">
                    <div class="services__one-item">
                        <div class="services__one-item-icon">
                            <i class="flaticon-idea-1"></i>
                        </div>
                        <div class="services__one-item-content">
                            <h4><a href="#">Entrümpelung</a></h4>
                            <p>Wir entrümpeln alles! Vom Dachboden bis zum Keller! Auch außerhalb des Hauses, wie Scheunen, Garagen und Gärten. Von Kleinentsorgungen bis zu Komplettentrümpelung.</p>
                            <a class="more_btn" href="#">Mehr erfahren<i class="flaticon-right-up"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6  mt-25">
                    <div class="services__one-item">
                        <div class="services__one-item-icon">
                            <i class="flaticon-strategy"></i>
                        </div>
                        <div class="services__one-item-content">
                            <h4><a href="#">Haushalts- und Gewerbeauflösung</a></h4>
                            <p>Egal ob Privat oder Gewerbe - wir sorgen für eine fachgerechte Auflösung ihrer Wohn- oder Gewerbeflächen und Objekte.</p>
                            <a class="more_btn" href="#">Mehr erfahren<i class="flaticon-right-up"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6  mt-25">
                    <div class="services__one-item">
                        <div class="services__one-item-icon">
                            <i class="flaticon-sales"></i>
                        </div>
                        <div class="services__one-item-content">
                            <h4><a href="#">Umzug</a></h4>
                            <p>Sicher ins neue Heim! Wir bieten neben dem Umzug auch Kartons an. Von kleinen Möbelumzügen bis zu großen Haushalten.</p>
                            <a class="more_btn" href="#">Mehr erfahren<i class="flaticon-right-up"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6  mt-25">
                    <div class="services__one-item">
                        <div class="services__one-item-icon">
                            <i class="flaticon-project-management"></i>
                        </div>
                        <div class="services__one-item-content">
                            <h4><a href="#">Kleintransporte</a></h4>
                            <p>Kleintransporte bis 3,5t, Eil- und Kurierfahrten in Großraum Berlin. Wir transportieren Ihr Gut schnell und zuverlässig. Sei es einmalig oder fest für eine lange Zeit.</p>
                            <a class="more_btn" href="#">Mehr erfahren<i class="flaticon-right-up"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- END SERVICES AREA --}}

    {{-- ABOUT AREA --}}
    <div class="about__one overflow-hidden section-padding">
        <div class="container">
            <div class="row al-center">
                <div class="col-lg-6 lg-mb-25">
                    <div class="about__one-left mr-30 lg-mr-0 lg-pr-25">
                        <img  src="assets/img/about/about-1.png" alt="image">
                        <div class="two">
                            <img class="bounce_y" src="assets/img/about/about-2.jpg" alt="image">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about__one-right ml-40 xl-ml-0">
                        <div class="about__one-right-title">
                            <span class="subtitle ">Erfahre mehr über uns</span>
                            <h2 class=" mb-20">Erfahrener Anbieter für Entrümpelung in Berlin </h2>
                            <p>Wir sind Ihre Experten für schnelle und zuverlässige Entrümpelung in Berlin. Ob Möbel, Elektrogeräte oder großer Sperrmüll – wir entsorgen alles fachgerecht und umweltbewusst.</p>
                            <p>Unsere Kunden sind private Haushalte, Vermieter, Firmen, Hausverwaltungen und Behörden in ganz Berlin. Wir legen Wert auf transparente Konditionen und bieten kurzfristige Besichtigungen an.</p>
                            <p>Unser Service umfasst Verpackung, Verladung, Mülltrennung und Möbel-Demontage – alles zum fairen Festpreis, ohne versteckte Kosten. Zudem übernehmen wir auch Transporte und bundesweite Umzüge. Kontaktieren Sie uns gerne!</p>
                        </div>
                        <div class="about__one-right-list mt-35">
                            <div class="row">
                                <div class="col-sm-6 ">
                                    <ul>
                                        <li><i class="flaticon-check-mark"></i>Schnelle Terminvereinbarung</li>
                                        <li><i class="flaticon-check-mark"></i>Kostenlose Besichtigung</li>
                                        <li><i class="flaticon-check-mark"></i>Preiswerte Entsorgung</li>
                                    </ul>
                                </div>
                                <div class="col-sm-6 sm-mt-10 ">
                                    <ul>
                                        <li><i class="flaticon-check-mark"></i>Unkomplizierter Ablauf</li>
                                        <li><i class="flaticon-check-mark"></i>100% Zufriedenheitsgarantie</li>
                                        <li><i class="flaticon-check-mark"></i>Besenreine Übergabe</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="item_bounce mt-45">
                            <a class="default_button" href="#">Besichtigung vereinbaren<i class="flaticon-right-up"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- END ABOUT AREA --}}

{{--    <x-portfolio-area />--}}

    {{-- PROCESS AREA --}}
    <div class="process__area overflow-hidden section-padding">
        <div class="bg_shape" style="background-image: url('assets/img/shape/bg.png');"></div>
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="process__area-title t-center">
                        <span class="subtitle ">3 Schritte</span>
                        <h2>Komplizierte Prozesse einfach erledigen</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="process__area-list">
                        <div class="process__area-item ">
                            <span>01</span>
                            <div class="process__area-item-area">
                                <i class="flaticon-analyst"></i>
                                <h5>Beratung, Terminabspache und Besichtigung</h5>
                                <p>Wir beraten Sie gerne vorab telefonisch und vereinbaren einen Termin. Im Anschluss besichtigen wir Ihr Objekt direkt vor Ort. Die Anfahrt und die Besichtigung sind kostenlos.</p>
                            </div>
                        </div>
                        <div class="process__area-item ">
                            <span>02</span>
                            <div class="process__area-item-area">
                                <i class="flaticon-influencer"></i>
                                <h5>Angebot, Auftragserteilung und Räumungstermin</h5>
                                <p>Nach Besichtigung des Objekts erstellen wir ein Angebot mit Festpreisgarantie inklusive Wertanrechnung. Nach Ihrer Auftragserteilung vereinbaren wir einen fixen Termin zur Räumung Ihres Objekts.</p>
                            </div>
                        </div>
                        <div class="process__area-item">
                            <span>03</span>
                            <div class="process__area-item-area">
                                <i class="flaticon-select"></i>
                                <h5>Räumung, Entsorgung, Übergabe</h5>
                                <p>Wir räumen Ihr Objekt zum vereinbarten Termin, mit anschließender fachgerechter Entsorgung. Auf Wunsch erfolgen Zusatzarbeiten. Zum Abschluss erfolgt die besenreine Übergabe.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- END PROCESS AREA --}}

    <x-footer-cta />
@endsection
