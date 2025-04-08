@php
    $title = "Professionelle Entsorgung | " . $page->title;
    $description = "Wenn Sie in Berlin und Umgebung nach einer professionellen Entsorgung von Bauschutt, Möbel, Sperrmüll usw. suchen, stehen wir von Max Entsorgung bereit, um Sie bei jedem Schritt zu unterstützen."
@endphp

@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h2>Entsorgung</h2>
                        <ul>
                            <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                            <li>Entsorgung</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="services__details section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 columns_sticky">
                    <div class="all__sidebar">
                        <div class="all__sidebar-item">
                            <h5>Entsorgung in Berlin und Umgebung</h5>
                            <div class="all__sidebar-item-category">
                                <ul>
                                    <li><a href="#">Bauschuttentsorgung<i class="flaticon-right-up"></i></a></li>
                                    <li><a href="#">Möbelentsorgung<i class="flaticon-right-up"></i></a></li>
                                    <li><a href="#">Sperrmüllentsorgung<i class="flaticon-right-up"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="all__sidebar-item-help mb-25">
                            <a href="/"><img src="/assets/img/logo-w.png" alt=""></a>
                            <span>Können wir Ihnen helfen?</span>
                            <h4><a href="tel(415)755-7890">(415) 755-7890</a></h4>
                            <a class="default_button" href="/anfrage">Termin vereinbaren<i class="flaticon-right-up"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="services__details-area">
                        <img src="/assets/img/services/services-1.jpg" alt="image">
                        <h3 class="mt-25 mb-20">Professionelle Entsorgung in Berlin</h3>
                        <p class="mb-20">Wenn Sie in Berlin und Umgebung nach einer professionellen Entsorgung suchen, stehen wir bereit, um Sie bei jedem Schritt zu unterstützen. Egal ob Sie alte Möbel loswerden, Bauschutt abtransportieren oder Elektroschrott fachgerecht entsorgen möchten: Wir bieten Ihnen eine schnelle, saubere und unkomplizierte Lösung. Kurz gesagt: Wir sind Ihr zuverlässiger Partner, wenn es darum geht, Platz zu schaffen und Ordnung in Ihrem Zuhause, Büro oder auf Ihrer Baustelle wiederherzustellen.</p>
                        <p class="mb-20">Wir wissen aus langjähriger Erfahrung in der Entsorgung, dass ein zuverlässiger Ansprechpartner Gold wert ist. Genau darum kümmern wir uns mit Herzblut um jedes Detail, von A wie Abholung bis Z wie Zwischenlagerung (falls es bei Spezialmüll oder größeren Aufträgen erforderlich ist). In Berlin sind wir an Ihrer Seite, um Ihnen Zeit, Nerven und oft auch einiges an Kosten zu ersparen. Keine Sorge, wir gehen das locker an, aber immer mit Professionalität und Blick fürs Wesentliche.</p>

                        <h4>Diese Entsorgungen bieten wir in Berlin an</h4>
                        <div class="about__one-right-list mt-15 mb-25">
                            <ul>
                                <li><i class="fas fa-chevron-circle-right"></i>Sperrmüllentsorgung</li>
                                <li><i class="fas fa-chevron-circle-right"></i>Möbelentsorgung</li>
                                <li><i class="fas fa-chevron-circle-right"></i>Bauschuttentsorgung</li>
                                <li><i class="fas fa-chevron-circle-right"></i>Küchenentsorgung</li>
                                <li><i class="fas fa-chevron-circle-right"></i>Elektroschrott Entsorgung</li>
                            </ul>
                        </div>
{{--                        <p class="mt-15">Nachdem wir eine kostenlose Erstbesichtigung durchgeführt haben, erstellen wir Ihnen ein verbindliches Angebot mit einem festen Preis für die Entrümpelung.</p>--}}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <x-footer-cta />
@endsection
