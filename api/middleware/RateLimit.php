<?php
declare(strict_types=1);

namespace VideoEditor\Api\Middleware;

use VideoEditor\Api\Lib\Response;

final class RateLimit
{
    private const MAX_REQUESTS = 120;
    private const WINDOW_SECONDS = 60;

    public static function handle(): void
    {
        // Phase 2 will implement persistent rate limiting via Redis or APCu.
        // For now, pass through.
    }
}
