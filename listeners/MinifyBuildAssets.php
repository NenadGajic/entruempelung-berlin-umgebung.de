<?php

namespace App\Listeners;

use RuntimeException;
use TightenCo\Jigsaw\Jigsaw;

class MinifyBuildAssets
{
    public function handle(Jigsaw $jigsaw)
    {
        if (!$jigsaw->getConfig('production')) {
            return;
        }

        $scriptPath = dirname(__DIR__) . '/scripts/minify-build-assets.js';
        $destinationPath = $jigsaw->getDestinationPath();

        $command = sprintf(
            'node %s %s 2>&1',
            escapeshellarg($scriptPath),
            escapeshellarg($destinationPath)
        );

        exec($command, $output, $exitCode);

        if ($exitCode !== 0) {
            throw new RuntimeException(
                "Asset minification failed with exit code {$exitCode}.\n" . implode(PHP_EOL, $output)
            );
        }

        if (!empty($output)) {
            echo implode(PHP_EOL, $output) . PHP_EOL;
        }
    }
}
