<?php

use App\Listeners\GenerateSitemap;
use App\Listeners\MinifyBuildAssets;
use TightenCo\Jigsaw\Jigsaw;

/** @var \Illuminate\Container\Container $container */
/** @var \TightenCo\Jigsaw\Events\EventBus $events */

$events->afterBuild(GenerateSitemap::class);
$events->afterBuild(MinifyBuildAssets::class);
