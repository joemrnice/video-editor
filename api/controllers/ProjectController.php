<?php
declare(strict_types=1);

namespace VideoEditor\Api\Controllers;

use VideoEditor\Api\Lib\Response;
use VideoEditor\Api\Lib\Validator;

final class ProjectController
{
    public function index(): void
    {
        Response::json(['data' => []]);
    }

    public function store(): void
    {
        $v = Validator::fromJson()->required('name');
        if (!$v->isValid()) {
            Response::error(json_encode($v->errors()), 422);
        }
        Response::json(['data' => null], 501);
    }

    public function show(int $id): void
    {
        Response::json(['data' => null], 501);
    }

    public function update(int $id): void
    {
        Response::json(['data' => null], 501);
    }

    public function destroy(int $id): void
    {
        Response::json(['data' => null], 501);
    }
}
