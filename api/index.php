<?php
declare(strict_types=1);

use VideoEditor\Api\Lib\Response;
use VideoEditor\Api\Middleware\CORS;
use VideoEditor\Api\Middleware\Auth;
use VideoEditor\Api\Middleware\RateLimit;

define('BASE_PATH', dirname(__DIR__));
define('API_PATH',  __DIR__);

spl_autoload_register(static function (string $class): void {
    $base   = BASE_PATH . '/api/';
    $prefix = 'VideoEditor\\Api\\';
    if (!str_starts_with($class, $prefix)) return;
    $relative = str_replace('\\', DIRECTORY_SEPARATOR, substr($class, strlen($prefix)));
    $file = $base . $relative . '.php';
    if (is_file($file)) require_once $file;
});

set_exception_handler(static function (Throwable $e): void {
    Response::error($e->getMessage(), 500);
});

set_error_handler(static function (int $errno, string $errstr): bool {
    throw new \ErrorException($errstr, $errno);
});

CORS::handle();
RateLimit::handle();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri    = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$uri    = '/' . trim((string)$uri, '/');
$uri    = preg_replace('#^/api#', '', $uri) ?: '/';

$routes = [
    'GET'  => [
        '/health'           => static fn() => Response::json(['status' => 'ok', 'time' => time()]),
        '/projects'         => static fn() => Response::json(['data' => []]),
    ],
    'POST' => [
        '/auth/login'       => static fn() => Response::json(['token' => null], 501),
        '/projects'         => static fn() => Response::json(['data' => null], 501),
        '/upload/chunk'     => static fn() => Response::json(['data' => null], 501),
    ],
];

$handler = $routes[$method][$uri] ?? null;

if ($handler === null) {
    Response::error('Not Found', 404);
    exit;
}

Auth::handle($method, $uri);
$handler();
