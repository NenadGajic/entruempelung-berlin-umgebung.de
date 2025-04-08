@php
$title = "Kostenlose Anfrage Senden | " . $page->title;
$description = "Senden Sie uns eine Anfrage zur kostenloser Besichtigung und starten Sie den Prozess von unkomplizierten Entrümpelung oder Entsorgung im Großraum Berlin."
@endphp

@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h2>Online Anfrage</h2>
                        <ul>
                            <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                            <li>Online Anfrage</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="request__quote section-padding-three">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <form action="#">
                        <div class="row">
{{--                            <div class="col-md-4 mt-25">--}}
{{--                                <div class="request__quote-item">--}}
{{--                                    <label>Anrede <span> *</span></label>--}}
{{--                                    <select name="anrede">--}}
{{--                                        <option value="Herr">Herr</option>--}}
{{--                                        <option value="Frau">Frau</option>--}}
{{--                                    </select>--}}
{{--                                </div>--}}
{{--                            </div>--}}

                            <div class="col-md-128 mt-25">
                                <div class="request__quote-item">
                                    <label>Vollständiger Name<span> *</span></label>
                                    <input type="text" name="name" placeholder="Max Mustermann" required>
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>E-Mail Adresse<span> *</span></label>
                                    <input type="email" name="email" placeholder="beispiel@email.com" required>
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Telefonnummer<span> *</span></label>
                                    <input type="text" name="nummer" placeholder="+49 123456789" required>
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Postleitzahl und Ortschaft<span> *</span></label>
                                    <input type="text" name="plz" placeholder="z.B.: 10115 Berlin" required>
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Straße und Hausnummer<span> *</span></label>
                                    <input type="text" name="strasse" placeholder="Musterstraße 1/20" required>
                                </div>
                            </div>

                            <div class="col-md-12 mt-25">
                                <p class="mb-10">Welche Leistungen benötigen Sie von uns?<span> *</span></p>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="request__quote-services">
                                            <label><input class="mr-10" type="checkbox">Entrümpelung</label>
                                            <label><input class="mr-10" type="checkbox">Entsorgung</label>
                                            <label><input class="mr-10" type="checkbox">Büro- oder Haushaltsauflösung</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="request__quote-services">
                                            <label><input class="mr-10" type="checkbox">Kleintransport</label>
                                            <label><input class="mr-10" type="checkbox">Umzug</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 mt-25">
                                <div class="request__quote-item">
                                    <label>Anmerkungen / Details<span> *</span></label>
                                    <textarea name="message" placeholder="Zusätzliche Infos an uns"></textarea>
                                </div>
                            </div>
                            
                            <div class="col-lg-12">
                                <button class="default_button mt-25" type="submit">
                                    Anfrage Senden
                                    <i class="flaticon-right-up"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
