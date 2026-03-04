@php
    $hasSidebar = !empty($service['sidebar']);
    $rowClass = $hasSidebar ? 'row' : 'row justify-content-center';
    $mainColClass = 'col-lg-8';
@endphp

<div class="breadcrumb__area">
    <div class="container">
        <div class="row">
            <div class="col-xl-12">
                <div class="breadcrumb__area-content">
                    <h1>{{ $service['h1'] }}</h1>
                    <ul>
                        <li><a href="{{ $page->baseUrl }}">Home</a><i>/</i></li>
                        <li>{{ $service['h1'] }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="services__details section-padding">
    <div class="container">
        <div class="{{ $rowClass }}">
            @if($hasSidebar)
                <div class="col-lg-4 columns_sticky">
                    <div class="all__sidebar">
                        <div class="all__sidebar-item">
                            <h5>{{ $service['sidebar']['title'] }}</h5>
                            <div class="all__sidebar-item-category">
                                <ul>
                                    @foreach($service['sidebar']['items'] as $item)
                                        <li>
                                            <a href="{{ $item['url'] }}">
                                                {{ $item['label'] }}<i class="flaticon-right-up"></i>
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                        <x-sidebar-contact />
                    </div>
                </div>
            @endif

            <div class="{{ $mainColClass }}">
                <div class="services__details-area">
                    <img src="{{ $service['hero']['src'] }}" alt="{{ $service['hero']['alt'] }}">
                    <h2 class="mt-25 mb-20">{{ $service['heading'] }}</h2>

                    @foreach($service['intro_paragraphs'] as $paragraph)
                        <p class="mb-20">{{ $paragraph }}</p>
                    @endforeach

                    @if(!empty($service['detail_heading']))
                        <h3>{{ $service['detail_heading'] }}</h3>
                    @endif

                    @if(!empty($service['detail_paragraphs']))
                        @foreach($service['detail_paragraphs'] as $paragraph)
                            <p class="mt-15">{{ $paragraph }}</p>
                        @endforeach
                    @endif

                    @if(!empty($service['list_items']))
                        <h3>{{ $service['list_heading'] }}</h3>
                        <div class="about__one-right-list mt-15 mb-25">
                            <ul>
                                @foreach($service['list_items'] as $item)
                                    <li><i class="fas fa-chevron-circle-right"></i>{{ $item }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    @if(!empty($service['related_services']))
                        <div class="about__one-right-list mt-25">
                            <h3>Weitere Leistungen</h3>
                            <ul>
                                @foreach($service['related_services'] as $relatedService)
                                    <li>
                                        <i class="fas fa-chevron-circle-right"></i>
                                        <a href="{{ $relatedService['url'] }}">{{ $relatedService['label'] }}</a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<x-footer-cta />
