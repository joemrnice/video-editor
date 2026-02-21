<?php
declare(strict_types=1);

namespace VideoEditor\Api\Middleware;

final class CORS
{
    private static array $allowed = ['http://localhost', 'http://localhost:8080'];

    public static function handle(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (in_array($origin, self::$allowed, true)) {
            header("Access-Control-Allow-Origin: {$origin}");
            header('Vary: Origin');
        }
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Chunk-Index, X-Total-Chunks, X-Upload-Id, X-Filename');
        header('Access-Control-Max-Age: 86400');
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
