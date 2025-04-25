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
            <form name="contact" id="contact-form" method="POST" data-netlify-recaptcha="true" data-netlify="true">
                <section class="contact-group">
                    <h5>Ihre Kontaktdaten</h5>

                    <div class="row">
                        <div class="col-md-6 mt-25">
                            <div class="request__quote-item">
                                <label>Vollständiger Name</label>
                                <input type="text" name="name" placeholder="Max Mustermann" required>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mt-25">
                            <div class="request__quote-item">
                                <label>E-Mail Adresse</label>
                                <input type="email" name="email" placeholder="beispiel@email.com" required>
                            </div>
                        </div>

                        <div class="col-md-6 mt-25">
                            <div class="request__quote-item">
                                <label>Telefonnummer</label>
                                <input type="text" name="nummer" placeholder="+49 123456789" required>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="contact-group mt-50">
                    <h5>Service-Details</h5>

                    <div class="row">
                        <div class="col-md-12 mt-25">
                            <div class="request__quote-item">
                                <label>Welche Dienstleisung benötigen Sie? </label>
                                <select id="service" name="service">
                                    <option selected>-- bitte auswählen --</option>
                                    <option value="entrümpelung">Entrümpelung</option>
                                    <option value="entsorgung">Entsorgung</option>
                                    <option value="auflösung">Auflösung</option>
                                    <option value="umzug">Umzug</option>
                                    <option value="transport">Transport</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="conditional-group" data-service="entruempelung,aufloesung,entsorgung"
                         style="display:none;">
                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Postleitzahl und Ortschaft</label>
                                    <input type="text" name="objekt-plz" placeholder="z.B.: 10115 Berlin">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Straße und Hausnummer</label>
                                    <input type="text" name="strasse" placeholder="Musterstraße 1/20">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Etage</label>
                                    <input type="text" name="etage"
                                           placeholder="z.B.: Keller, Erdgeschoss, 3. Etage usw.">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Aufzug vorhanden?</label>
                                    <select name="aufzug">
                                        <option selected>-- bitte auswählen --</option>
                                        <option value="nein">nein</option>
                                        <option value="ja-klein">ja, klein</option>
                                        <option value="ja-gross">ja, groß</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="conditional-group" data-service="entruempelung,aufloesung" style="display:none;">
                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Welche Objektart soll entrümpelt / aufgelöst werden?</label>
                                    <select name="objekt">
                                        <option selected>-- bitte auswählen --</option>
                                        <option value="wohnung">Wohnung</option>
                                        <option value="haus">Haus</option>
                                        <option value="keller">Keller/Garage</option>
                                        <option value="buero">Büro</option>
                                        <option value="sonstiges">Sonstiges *</option>
                                    </select>
                                    <small>Sonstiges bitte in bei Zusatzinfos ergänzen!</small>
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Wie groß ist ungefähr die zu räumende Fläche?</label>
                                    <input type="text" name="flaeche" placeholder="z.B.: 50 m2">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="conditional-group" data-service="entsorgung" style="display:none;">
                        <div class="row">
                            <div class="col-md-12 mt-25">
                                <div class="request__quote-item">
                                    <label>Was möchten Sie entsorgen?</label>
                                    <textarea name="entsorgungs-beschreibung"
                                              placeholder="Beschreiben Sie was genau entsorgt werden muss. Je mehr Infos, desto besser."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="conditional-group" data-service="transport,umzug" style="display:none;">
                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Abholungsadresse: PLZ und Ortschaft</label>
                                    <input type="text" name="abhol-plz" placeholder="z.B.: 10115 Berlin">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Abholungsadresse: Straße und Hausnummer</label>
                                    <input type="text" name="abhol-adresse" placeholder="Musterstraße 1/20">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Zustelladresse: PLZ und Ortschaft</label>
                                    <input type="text" name="zustell-plz" placeholder="z.B.: 10115 Berlin">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Zustelladresse: Straße und Hausnummer</label>
                                    <input type="text" name="zustell-adresse" placeholder="Musterstraße 1/20">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label>Gewicht</label>
                                    <input type="text" name="gewicht"
                                           placeholder="Das Gesamtgewicht der zu transportierenden Ware (z.B. 800kg)">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 mt-25">
                                    <div class="request__quote-item">
                                        <label>Zu transportierende Ware</label>
                                        <textarea name="ware"
                                                  placeholder="Beschreiben Sie was genau transportiert werden muss, ob und wie es verpackt ist, damit wir einfacher ein Fahrzeug einteilen können."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="contact-group mt-50">
                    <h5>Zusatzinfos</h5>

                    <div class="row">
                        <div class="col-md-12 mt-25">
                            <div class="request__quote-item">
                                <label>Wunschdatum</label>
                                <input type="date" name="wunschdatum">
                            </div>
                        </div>

                        <div class="col-md-12 mt-25">
                            <div class="request__quote-item">
                                <label>Anmerkungen / Details</label>
                                <textarea name="details"
                                          placeholder="Zusätzliche Infos an uns, die uns helfen können einen Überblick zu bekommen und den ersten Schritt zu beschleundigen."></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="row mt-25">
                    <div class="col-lg-12">
                        <div data-netlify-recaptcha="true"></div>
                    </div>
                </div>

                <div class="row">
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
@endsection
