@php
    $service = $page->services['entsorgung'];
    $title = $service['meta_title'] . ' | ' . ($page->titleSuffixInner ?? $page->title);
    $description = $service['meta_description'];
    $ogImage = $service['og_image'];
    $serviceSchema = [
        'name' => $service['h1'],
        'description' => $service['meta_description'],
        'image' => $service['og_image'] ?? ($service['hero']['src'] ?? null),
    ];

    $breadcrumbs = [];
    foreach ($service['breadcrumbs'] as $crumb) {
        $breadcrumbs[] = [
            'name' => $crumb['name'],
            'url' => $crumb['url'],
        ];
    }
@endphp

@extends('_layouts.main')

@section('body')
    @include('_components.service-page', ['service' => $service])
@endsection
