<?php
declare(strict_types=1);

namespace VideoEditor\Api\Controllers;

use VideoEditor\Api\Lib\Response;
use VideoEditor\Api\Lib\ChunkedUpload;

final class MediaController
{
    public function index(): void
    {
        Response::json(['data' => []]);
    }

    public function upload(): void
    {
        $upload = new ChunkedUpload();
        $tmp    = $upload->tempPath();
        $body   = file_get_contents('php://input');
        if ($body === false || $body === '') {
            Response::error('Empty body', 400);
        }
        file_put_contents($tmp, $body);
        if ($upload->isLastChunk()) {
            Response::json(['status' => 'complete', 'uploadId' => $upload->uploadId()]);
        }
        Response::json(['status' => 'chunk_received', 'index' => $upload->chunkIndex()]);
    }
}
