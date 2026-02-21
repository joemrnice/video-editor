<?php
declare(strict_types=1);

namespace VideoEditor\Api\Middleware;

use VideoEditor\Api\Lib\Response;

final class Auth
{
    private const PUBLIC_ROUTES = [
        'GET:/health',
        'POST:/auth/login',
        'POST:/auth/register',
    ];

    public static function handle(string $method, string $uri): void
    {
        $key = "{$method}:{$uri}";
        if (in_array($key, self::PUBLIC_ROUTES, true)) return;

        $token = self::extractToken();
        if ($token === null) {
            Response::error('Unauthorized', 401);
        }
        // Token validation will be implemented in Phase 2.
    }

    private static function extractToken(): ?string
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (str_starts_with($header, 'Bearer ')) {
            return substr($header, 7);
        }
        return null;
    }
}
