@php
    $title = "Kostenlose Anfrage senden | " . $page->title;
    $description = "Senden Sie uns eine Anfrage für eine kostenlose Besichtigung und starten Sie den Prozess für eine unkomplizierte Entrümpelung oder Entsorgung im Großraum Berlin.";
    $ogImage = "/assets/img/berlin-brandenburg.jpg";
    $breadcrumbs = [
        ['name' => 'Home', 'url' => '/'],
        ['name' => 'Online-Anfrage', 'url' => '/anfrage'],
    ];
@endphp

@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h1>Online-Anfrage</h1>
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
            <form name="contact" id="contact-form" method="POST" data-netlify-recaptcha="true" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact">
                <p class="display-none">
                    <label for="bot-field">Bitte dieses Feld leer lassen:</label>
                    <input id="bot-field" name="bot-field">
                </p>
                <section class="contact-group">
                    <h5>Ihre Kontaktdaten</h5>

                    <div class="row">
                        <div class="col-md-6 mt-25">
                            <div class="request__quote-item">
                                <label for="name">Vollständiger Name</label>
                                <input id="name" type="text" name="name" placeholder="Max Mustermann" autocomplete="name" required>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mt-25">
                            <div class="request__quote-item">
                                <label for="email">E-Mail Adresse</label>
                                <input id="email" type="email" name="email" placeholder="beispiel@email.com" autocomplete="email" required>
                            </div>
                        </div>

                        <div class="col-md-6 mt-25">
                            <div class="request__quote-item">
                                <label for="nummer">Telefonnummer</label>
                                <input id="nummer" type="tel" name="nummer" placeholder="+49 123456789" autocomplete="tel" inputmode="tel" required>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="contact-group mt-50">
                    <h5>Service-Details</h5>

                    <div class="row">
                        <div class="col-md-12 mt-25">
                            <div class="request__quote-item">
                                <label for="service">Welche Dienstleistung benötigen Sie?</label>
                                <select id="service" name="service" required>
                                    <option value="" selected disabled>-- bitte auswählen --</option>
                                    <option value="entruempelung">Entrümpelung</option>
                                    <option value="entsorgung">Entsorgung</option>
                                    <option value="aufloesung">Auflösung</option>
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
                                    <label for="plz">Postleitzahl und Ortschaft</label>
                                    <input id="plz" type="text" name="plz" placeholder="z.B.: 10115 Berlin" autocomplete="postal-code" inputmode="numeric">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="strasse">Straße und Hausnummer</label>
                                    <input id="strasse" type="text" name="strasse" placeholder="Musterstraße 1/20" autocomplete="address-line1">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="etage">Etage</label>
                                    <input id="etage" type="text" name="etage"
                                           placeholder="z.B.: Keller, Erdgeschoss, 3. Etage usw.">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="aufzug">Aufzug vorhanden?</label>
                                    <select id="aufzug" name="aufzug">
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
                                    <label for="objekt">Welche Objektart soll entrümpelt / aufgelöst werden?</label>
                                    <select id="objekt" name="objekt">
                                        <option selected>-- bitte auswählen --</option>
                                        <option value="wohnung">Wohnung</option>
                                        <option value="haus">Haus</option>
                                        <option value="keller">Keller/Garage</option>
                                        <option value="buero">Büro</option>
                                        <option value="sonstiges">Sonstiges *</option>
                                    </select>
                                    <small>Sonstiges bitte bei den Zusatzinfos ergänzen.</small>
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="flaeche">Wie groß ist ungefähr die zu räumende Fläche?</label>
                                    <input id="flaeche" type="text" name="flaeche" placeholder="z.B.: 50 m2">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="conditional-group" data-service="entsorgung" style="display:none;">
                        <div class="row">
                            <div class="col-md-12 mt-25">
                                <div class="request__quote-item">
                                    <label for="entsorgungs_beschreibung">Was möchten Sie entsorgen?</label>
                                    <textarea id="entsorgungs_beschreibung" name="entsorgungs_beschreibung"
                                              placeholder="Beschreiben Sie was genau entsorgt werden muss. Je mehr Infos, desto besser."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="conditional-group" data-service="transport,umzug" style="display:none;">
                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="abhol_plz">Abholungsadresse: PLZ und Ortschaft</label>
                                    <input id="abhol_plz" type="text" name="abhol_plz" placeholder="z.B.: 10115 Berlin" autocomplete="postal-code" inputmode="numeric">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="abhol_adresse">Abholungsadresse: Straße und Hausnummer</label>
                                    <input id="abhol_adresse" type="text" name="abhol_adresse" placeholder="Musterstraße 1/20" autocomplete="address-line1">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="zustell_plz">Zustelladresse: PLZ und Ortschaft</label>
                                    <input id="zustell_plz" type="text" name="zustell_plz" placeholder="z.B.: 10115 Berlin" autocomplete="postal-code" inputmode="numeric">
                                </div>
                            </div>

                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="zustell_adresse">Zustelladresse: Straße und Hausnummer</label>
                                    <input id="zustell_adresse" type="text" name="zustell_adresse" placeholder="Musterstraße 1/20" autocomplete="address-line1">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mt-25">
                                <div class="request__quote-item">
                                    <label for="gewicht">Gewicht</label>
                                    <input id="gewicht" type="text" name="gewicht"
                                           placeholder="Das Gesamtgewicht der zu transportierenden Ware (z.B. 800kg)">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 mt-25">
                                    <div class="request__quote-item">
                                        <label for="ware">Zu transportierende Ware</label>
                                        <textarea id="ware" name="ware"
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
                                <label for="wunschdatum">Wunschdatum</label>
                                <input id="wunschdatum" type="date" name="wunschdatum">
                            </div>
                        </div>

                        <div class="col-md-12 mt-25">
                            <div class="request__quote-item">
                                <label for="details">Anmerkungen / Details</label>
                                <textarea id="details" name="details"
                                          placeholder="Zusätzliche Infos an uns, die uns helfen können, einen Überblick zu bekommen und den ersten Schritt zu beschleunigen."></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="row mt-25">
                    <div class="col-lg-12">
                        <div data-netlify-recaptcha="true"></div>
                    </div>
                </div>

                <div class="row mt-25">
                    <div class="col-lg-12">
                        <div id="form-status" class="alert alert-info" style="display: none;" role="status" aria-live="polite"></div>
                        <div id="form-error" class="alert alert-danger" style="display: none;" role="alert" aria-live="assertive"></div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <button id="form-submit-button" class="default_button mt-25" type="submit">
                            Anfrage Senden
                            <i class="flaticon-right-up"></i>
                        </button>
                    </div>
                </div>
            </form>

            <div id="form-success" style="display: none;" role="status" aria-live="polite">
                <h2>Vielen Dank!</h2>
                <p>Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei Ihnen.</p>
              </div>
        </div>
    </div>
@endsection
