<?php

namespace App\Listeners;

use Illuminate\Support\Str;
use TightenCo\Jigsaw\Jigsaw;
use samdark\sitemap\Sitemap;

class GenerateSitemap
{
    public function handle(Jigsaw $jigsaw)
    {
        $baseUrl = $jigsaw->getConfig('baseUrl');
        $sitemap = new Sitemap($jigsaw->getDestinationPath().'/sitemap.xml');

        collect($jigsaw->getOutputPaths())->each(function ($path) use ($baseUrl, $sitemap) {
            if (!$this->isExcludedPath($path)) {
                $sitemap->addItem($baseUrl.($path ?: '/'), time(), Sitemap::WEEKLY);
            }
        });

        $sitemap->write();
    }

    public function isExcludedPath($path)
    {
        if (Str::startsWith($path, '/assets')) {
            return true;
        }

        return pathinfo($path, PATHINFO_EXTENSION) !== '';
    }
}
