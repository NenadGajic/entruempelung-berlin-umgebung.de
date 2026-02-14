@php
    $title = "Haushalts- und Gewerbeauflösung | " . $page->title;
    $description = "Wir kümmern uns um die professionelle und effiziente Auflösung von Haushalten, unabhängig davon, ob es sich um einen Privathaushalt oder einen Gewerbebetrieb handelt.";
    $ogImage = "/assets/img/bueroaufloesung.jpeg";
    $breadcrumbs = [
        ['name' => 'Home', 'url' => '/'],
        ['name' => 'Haushalts- und Gewerbeauflösung', 'url' => '/aufloesung'],
    ];
@endphp

@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h1>Haushalts- und Gewerbeauflösung</h1>
                        <ul>
                            <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                            <li>Haushalts- und Gewerbeauflösung</li>
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
                            <h5>Haushalts- und Gewerbeauflösung in Berlin und Umgebung</h5>
                            <div class="all__sidebar-item-category">
                                <ul>
                                    <li><a href="/anfrage?service=aufloesung">Haushalt- und Wohnungsauflösung<i class="flaticon-right-up"></i></a></li>
                                    <li><a href="/anfrage?service=aufloesung">Gewerbeauflösung<i class="flaticon-right-up"></i></a></li>
                                    <li><a href="/anfrage?service=aufloesung">Werkstattauflösung<i class="flaticon-right-up"></i></a></li>
                                    <li><a href="/anfrage?service=aufloesung">Lagerauflösung<i class="flaticon-right-up"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <x-sidebar-contact />
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="services__details-area">
                        <img src="/assets/img/bueroaufloesung.jpeg" alt="Haushalts- und Gewerbeauflösung in Berlin und Umgebung">
                        <h3 class="mt-25 mb-20">Haushalts- und Gewerbeauflösung in Berlin</h3>
                        <p class="mb-20">Wir kümmern uns um die professionelle und effiziente Auflösung von Haushalten, unabhängig davon, ob es sich um einen Privathaushalt oder einen Gewerbebetrieb handelt. Unsere Dienstleistung umfasst das Räumen und Entrümpeln sämtlicher Räumlichkeiten.</p>
                        <p class="mb-20">Wir bieten Ihnen für die Haushaltsauflösung eine kostenlose Besichtigung, einen transparenten Festpreis ohne versteckte Kosten und eine zügige sowie gründliche Durchführung. Bei Haushaltsauflösungen gibt es häufig wertvolle Gegenstände, die wir beim Gesamtpreis berücksichtigen, um Ihnen einen vorteilhaften Preis für die Haushaltsauflösung zu ermöglichen.</p>

                        <h4>Professionelle Haushaltsauflösung in Berlin und Umgebung</h4>
                        <p class="mt-15">Wenn Sie vor der Aufgabe stehen, eine Wohnung oder sogar ein Haus aufzugeben, taucht die Frage auf: wohin mit all den Sachen? Sie stehen vor einer regelrechten Herausforderung, da sich ein Berg an Möbeln und persönlichen Hinterlassenschaften vor Ihnen auftürmt. Und das alles muss bis zu einem bestimmten Termin erledigt werden?</p>
                        <p class="mt-15">Hier kommen wir ins Spiel: Unser erfahrenes Team übernimmt die gesamte Haushaltsauflösung für Sie. Sie müssen sich um nichts kümmern. Vom Räumen bis zur gründlichen Übergabe in besenreinem Zustand bieten wir Ihnen einen umfassenden Entrümpelungsservice.</p>

                        <div class="about__one-right-list mt-25">
                            <h4>Weitere Leistungen</h4>
                            <ul>
                                <li><i class="fas fa-chevron-circle-right"></i><a href="/entruempelung">Entrümpelung in Berlin und Umgebung</a></li>
                                <li><i class="fas fa-chevron-circle-right"></i><a href="/entsorgung">Entsorgung in Berlin und Umgebung</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <x-footer-cta />
@endsection
