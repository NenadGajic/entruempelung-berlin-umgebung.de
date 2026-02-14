@php
    $service = $page->services['transport'];
    $title = $service['meta_title'] . ' | ' . $page->title;
    $description = $service['meta_description'];
    $ogImage = $service['og_image'];

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
