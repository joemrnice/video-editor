<?php
declare(strict_types=1);

namespace VideoEditor\Api\Lib;

final class Response
{
    public static function json(mixed $data, int $status = 200): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit;
    }

    public static function error(string $message, int $status = 400): never
    {
        self::json(['error' => $message], $status);
    }

    public static function success(mixed $data = null, string $message = 'OK'): never
    {
        self::json(['message' => $message, 'data' => $data]);
    }
}
