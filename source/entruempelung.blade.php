@php
    $title = "Professionelle Entrümpelung | " . $page->title;
    $description = "Unsere Dienstleistungen erstrecken sich auf Entrümpelungen verschiedenster Art und Größe, darunter Wohnungen, (Hoch-)Häuser, Wohngemeinschaften und auch sogenannte Messi-Wohnungen."
@endphp

@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h2>Entrümpelung</h2>
                        <ul>
                            <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                            <li>Entrümpelung</li>
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
                        <h5>Entrümpelung in Berlin und Umgebung</h5>
                        <div class="all__sidebar-item-category">
                            <ul>
                                <li><a href="/anfrage?service=entruempelung">Wohnungsentrümpelung<i class="flaticon-right-up"></i></a></li>
                                <li><a href="/anfrage?service=entruempelung">Hausentrümpelung<i class="flaticon-right-up"></i></a></li>
                                <li><a href="/anfrage?service=entruempelung">Kellerentrümpelung<i class="flaticon-right-up"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <x-sidebar-contact />
                </div>
            </div>
            <div class="col-lg-8">
                <div class="services__details-area">
                    <img src="/assets/img/entruempelung.jpg" alt="Entrümpelung in Berlin und Umgebung">
                    <h3 class="mt-25 mb-20">Professionelle Entrümpelung in Berlin</h3>
                    <p class="mb-20">Unsere Dienstleistungen erstrecken sich auf Entrümpelungen verschiedenster Art und Größe, darunter Wohnungen, (Hoch-)Häuser, Wohngemeinschaften und auch sogenannte Messi-Wohnungen. Nachdem unser Experte die Räumlichkeiten inspiziert und einen Plan erstellt hat, rücken wir mit der geeigneten Ausrüstung und Fahrzeug an, um mit der Entrümpelung zu beginnen. Da nur erfahrene Fachleute bei uns tätig sind, wird die Arbeit besonders effizient erledigt. Nach Abschluss entsorgen wir den Abfall ordnungsgemäß, reinigen die Räumlichkeiten gründlich und übergeben Ihnen die Schlüssel zurück. Falls Sie spezielle Anforderungen oder Wünsche haben, stehen wir Ihnen gerne zur Verfügung und werden unser Bestes tun, um diese zu erfüllen.</p>

                    <h4>Ablauf einer professionellen Entrümpelung</h4>
                    <p class="mt-15">Nachdem wir eine kostenlose Erstbesichtigung durchgeführt haben, erstellen wir Ihnen ein verbindliches Angebot mit einem festen Preis für die Entrümpelung.</p>
                    <p class="mt-15">Es empfiehlt sich, während der regulären Bürozeiten mit uns in Kontakt zu treten. Allerdings sind wir auch außerhalb dieser Zeiten über Anruf, E-Mail oder das Kontaktformular erreichbar.</p>
                    <p class="mt-15">Gemeinsam besprechen wir die Details des Auftrags. Normalerweise kommen wir persönlich bei Ihnen vorbei, um uns vor Ort ein genaues Bild zu machen. Da jeder Entrümpelungsauftrag individuell ist, können wir Ihnen erst nach Klärung der zu entrümpelnden Gegenstände einen Preis nennen. Während dieses Treffens vereinbaren wir auch einen passenden Termin für die Durchführung des Auftrags.</p>
                </div>
            </div>
        </div>
    </div>
    </div>

    <x-footer-cta />
@endsection
