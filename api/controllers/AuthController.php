<?php
declare(strict_types=1);

namespace VideoEditor\Api\Controllers;

use VideoEditor\Api\Lib\Response;
use VideoEditor\Api\Lib\Validator;

final class AuthController
{
    public function login(): void
    {
        $v = Validator::fromJson()->required('email')->email('email')->required('password');
        if (!$v->isValid()) {
            Response::error(json_encode($v->errors()), 422);
        }
        Response::json(['token' => null, 'message' => 'Auth not yet implemented'], 501);
    }

    public function register(): void
    {
        Response::json(['message' => 'Registration not yet implemented'], 501);
    }
}
