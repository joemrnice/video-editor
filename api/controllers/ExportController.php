<?php
declare(strict_types=1);

namespace VideoEditor\Api\Controllers;

use VideoEditor\Api\Lib\Response;

final class ExportController
{
    public function start(int $projectId): void
    {
        Response::json(['data' => null, 'message' => 'Export not yet implemented'], 501);
    }

    public function status(string $jobId): void
    {
        Response::json(['data' => null, 'message' => 'Export status not yet implemented'], 501);
    }
}
