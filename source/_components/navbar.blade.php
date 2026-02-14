<div class="header__area">
    <div class="container">
        <div class="row">
            <div class="col-xl-12">
                <div class="header__area-menubar">
                    <div class="header__area-menubar-left one">
                        <div class="header__area-menubar-left-logo">
                            <a href="/">
                                <img class="dark-n" src="/assets/img/logo.png" alt="Entrümpelung Berlin Logo">
                                <img class="light-n" src="/assets/img/logo.png" alt="Entrümpelung Berlin Logo">
                            </a>
                        </div>
                    </div>
                    <div class="header__area-menubar-center">
                        <div class="header__area-menubar-center-menu">
                            <ul id="mobilemenu">
                                <li><a href="/entruempelung" class="{{ $page->active('entruempelung') }}">Entrümpelung</a></li>
{{--                                <li class="menu-item-has-children"><a href="#">Entrümpelung</a>--}}
{{--                                    <ul class="sub-menu">--}}
{{--                                        <li><a href="#">Entrümpelungen in Berlin</a></li>--}}
{{--                                        <li><a href="#">Wohnungsentrümpelung</a></li>--}}
{{--                                        <li><a href="#">Hausentrümpelung</a></li>--}}
{{--                                        <li><a href="#">Kellerentrümpelung</a></li>--}}
{{--                                    </ul>--}}
{{--                                </li>--}}
                                <li><a href="/entsorgung" class="{{ $page->active('entsorgung') }}">Entsorgung</a></li>
{{--                                <li class="menu-item-has-children"><a href="#">Entsorgung</a>--}}
{{--                                    <ul class="sub-menu">--}}
{{--                                        <li><a href="#">Entsorgung in Berlin</a></li>--}}
{{--                                        <li><a href="#">Bauschutt-Entsorgung</a></li>--}}
{{--                                        <li><a href="#">Möbelentsorgung</a></li>--}}
{{--                                        <li><a href="#">Sperrmüllentsorgung</a></li>--}}
{{--                                    </ul>--}}
{{--                                </li>--}}
                                <li><a href="/aufloesung" class="{{ $page->active('aufloesung') }}">Auflösungen</a></li>
{{--                                <li class="menu-item-has-children"><a href="#">Auflösungen</a>--}}
{{--                                    <ul class="sub-menu">--}}
{{--                                        <li><a href="#">Haushalt- und Wohnungsauflösung</a></li>--}}
{{--                                        <li><a href="#">Gewerbeauflösung</a></li>--}}
{{--                                    </ul>--}}
{{--                                </li>--}}
                                <li class="menu-item-has-children">
                                    <button
                                        type="button"
                                        class="submenu-toggle"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        aria-controls="submenu-sonstiges"
                                    >
                                        Sonstiges
                                    </button>
                                    <ul class="sub-menu" id="submenu-sonstiges">
                                        <li><a href="/umzug" class="{{ $page->active('umzug') }}">Umzug</a></li>
                                        <li><a href="/transport" class="{{ $page->active('transport') }}">Transport</a></li>
                                    </ul>
                                </li>
                                <li><a href="/anfrage"  class="{{ $page->active('anfrage') }}">Kontakt</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="header__area-menubar-right">
                        <div class="header__area-menubar-right-tel lg-display-n">
                            <div class="header__area-menubar-right-tel-icon">
                                <i class="flaticon-phone-call"></i>
                            </div>
                            <div class="header__area-menubar-right-tel-info">
                                <span>Rufe uns an</span>
                                <h6><a href="tel:+49 177 3975560">+49 177 3975560</a></h6>
                            </div>
                        </div>
                        <div class="header__area-menubar-right-responsive-menu menu__bar">
                            <button
                                type="button"
                                class="menu__bar-trigger"
                                aria-label="Menü öffnen"
                                aria-expanded="false"
                                aria-controls="mobile-menu-popup"
                            >
                                <i class="flaticon-menu-3" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
