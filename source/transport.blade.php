@php
    $title = "Kleintransporte bis 3,5t in Berlin und Umgebung | " . $page->title;
    $description = "Mit unserem eigenen Fuhrpark sind wir Ihr zuverlässiger Partner für Kleintransporte und Lieferungen in Berlin und deutschlandweit.";
    $ogImage = "/assets/img/transport.jpg";
    $breadcrumbs = [
        ['name' => 'Home', 'url' => '/'],
        ['name' => 'Transport', 'url' => '/transport'],
    ];
@endphp

@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h1>Transport</h1>
                        <ul>
                            <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                            <li>Transport</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="services__details section-padding">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="services__details-area">
                        <img src="/assets/img/transport.jpg" alt="Kleintransporte und Kurierdienste in Berlin und Umgebung">

                        <h3 class="mt-25 mb-20">Kleintransporte in Berlin und Umgebung</h3>
                        <p class="mb-20">Die pünktliche Lieferung ist eine Aufgabe, die nur von Fachleuten bewältigt werden kann. Sie haben Gegenstände, die von einem Ort zum anderen geliefert werden müssen, und suchen einen zuverlässigen Lieferanten?</p>
                        <p class="mb-20">Mit unserem eigenen Fuhrpark sind wir Ihr optimaler Partner für Lieferungen und ein vertrauenswürdiger Lieferdienst in Berlin und Deutschland.</p>
                        <p class="mb-20">Wir bieten Ihnen auch den passenden Lastwagen für Ihre Bedürfnisse. Mit unseren Lastwagen, inklusive Ladebordwand, transportieren wir gerne Ihre Paletten oder andere Güter von A nach B.</p>
                        <p class="mb-20">Egal, um welche Art von Lieferung es sich handelt, wir erledigen die Aufgabe schnell, zuverlässig und zu äußerst günstigen Konditionen.</p>
                        <p class="mb-20">Haben Sie Möbel von einem Geschäft oder anderswo gekauft, aber Ihr eigenes Fahrzeug ist nicht für den Transport geeignet? Dann sind wir die beste und kostengünstigste Lösung für Sie.</p>
                        <p class="mb-20">Unsere Fahrzeuge und wir stehen jederzeit zur Verfügung. Kontaktieren Sie uns einfach, und wir werden uns um alles Weitere kümmern. Ihre Zufriedenheit liegt uns stets am Herzen.</p>

                        <div class="about__one-right-list mt-25">
                            <h4>Weitere Leistungen</h4>
                            <ul>
                                <li><i class="fas fa-chevron-circle-right"></i><a href="/umzug">Umzug in Berlin und Umgebung</a></li>
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
