@extends('_layouts.main')

@section('body')
    <div class="breadcrumb__area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="breadcrumb__area-content">
                        <h2>Umzug</h2>
                        <ul>
                            <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                            <li>Umzug</li>
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
                        <img src="/assets/img/services/services-1.jpg" alt="image">

                        <h3 class="mt-25 mb-20">Umzug in Berlin und Umgebung</h3>
                        <p class="mb-20">Einen gut organisierten und durchgeplanten Umzug beginnen wir mit einer kompetenten Beratung und einem professionellen Team.</p>
                        <p class="mb-20">Wir zeichnen uns durch hochqualifizierte Spezialisten mit langjähriger Erfahrung aus. Wir planen Ihren Umzug und Ihre Übersiedlung bis ins kleinste Detail und führen unsere Arbeiten mit minimalem Risiko und maximalem Qualitäts- und Serviceanspruch durch.</p>
                        <p class="mb-20">Sobald Sie Ihre neue Wohnung gefunden haben und einen Umzugsservice benötigen, zögern Sie nicht und kontaktieren Sie uns noch heute. Unser Unternehmen passt sich optimal Ihren Anforderungen an.</p>
                        <p class="mb-20">Gerne vereinbaren wir auch einen kostenlosen Besichtigungstermin, um alle Einzelheiten zu besprechen. Unsere Fachberater organisieren den Umzug gemeinsam mit Ihnen.</p>
                        <p class="mb-20">Wenn Sie mit uns umziehen, können Sie sich beruhigt zurücklehnen, denn wir kümmern uns um alles.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <x-footer-cta />
@endsection
