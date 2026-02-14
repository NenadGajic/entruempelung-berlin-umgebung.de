@php
    $toAbsoluteUrl = static function ($url) use ($page) {
        if (!$url) {
            return null;
        }

        if (\Illuminate\Support\Str::startsWith($url, ['http://', 'https://'])) {
            return $url;
        }

        return rtrim($page->baseUrl, '/') . $url;
    };

    $siteUrl = rtrim($page->baseUrl, '/') . '/';
    $currentPageUrl = $page->getUrl();
    $metaTitleValue = isset($metaTitle) ? $metaTitle : $page->title;
    $metaDescriptionValue = isset($metaDescription) ? $metaDescription : $page->description;

    $websiteSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => $page->title,
        'url' => $siteUrl,
        'inLanguage' => str_replace('_', '-', $page->locale ?? 'de_DE'),
        'description' => $metaDescriptionValue,
    ];

    $businessImagePath = $page->businessImage ?? ($page->ogImage ?? '/assets/img/entruempelung.jpg');
    $localBusinessSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'LocalBusiness',
        'name' => $page->businessName ?? $page->title,
        'url' => $siteUrl,
        'telephone' => $page->businessPhone ?? '',
        'email' => $page->businessEmail ?? '',
        'areaServed' => $page->businessServiceArea ?? '',
        'image' => $toAbsoluteUrl($businessImagePath),
        'description' => $metaDescriptionValue,
    ];

    $breadcrumbSchema = null;
    if (isset($breadcrumbs) && is_array($breadcrumbs) && count($breadcrumbs) > 1) {
        $breadcrumbItems = [];
        foreach ($breadcrumbs as $index => $crumb) {
            $crumbName = $crumb['name'] ?? null;
            if (!$crumbName) {
                continue;
            }

            $crumbUrl = $crumb['url'] ?? null;
            $resolvedCrumbUrl = $crumbUrl ? $toAbsoluteUrl($crumbUrl) : $currentPageUrl;

            $breadcrumbItems[] = [
                '@type' => 'ListItem',
                'position' => count($breadcrumbItems) + 1,
                'name' => $crumbName,
                'item' => $resolvedCrumbUrl,
            ];
        }

        if (!empty($breadcrumbItems)) {
            $breadcrumbSchema = [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => $breadcrumbItems,
            ];
        }
    }
@endphp

<script type="application/ld+json">{!! json_encode($websiteSchema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
<script type="application/ld+json">{!! json_encode($localBusinessSchema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@if($breadcrumbSchema)
    <script type="application/ld+json">{!! json_encode($breadcrumbSchema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@endif
