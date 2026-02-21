<?php
declare(strict_types=1);

namespace VideoEditor\Api\Lib;

final class ChunkedUpload
{
    private readonly int $chunkIndex;
    private readonly int $totalChunks;
    private readonly string $uploadId;
    private readonly string $filename;

    public function __construct()
    {
        $this->chunkIndex  = (int)($_SERVER['HTTP_X_CHUNK_INDEX']  ?? 0);
        $this->totalChunks = (int)($_SERVER['HTTP_X_TOTAL_CHUNKS'] ?? 1);
        $this->uploadId    = $this->sanitizeId($_SERVER['HTTP_X_UPLOAD_ID'] ?? bin2hex(random_bytes(8)));
        $this->filename    = $this->sanitizeFilename($_SERVER['HTTP_X_FILENAME'] ?? 'upload');
    }

    public function chunkIndex(): int   { return $this->chunkIndex; }
    public function totalChunks(): int  { return $this->totalChunks; }
    public function uploadId(): string  { return $this->uploadId; }
    public function filename(): string  { return $this->filename; }
    public function isLastChunk(): bool { return $this->chunkIndex + 1 >= $this->totalChunks; }

    public function tempPath(): string
    {
        $dir = BASE_PATH . '/storage/uploads/' . $this->uploadId;
        if (!is_dir($dir) && !mkdir($dir, 0700, true)) {
            throw new \RuntimeException("Cannot create upload directory: {$dir}");
        }
        return $dir . '/chunk_' . $this->chunkIndex;
    }

    private function sanitizeFilename(string $name): string
    {
        return preg_replace('/[^a-zA-Z0-9._\-]/', '_', basename($name));
    }

    private function sanitizeId(string $id): string
    {
        return preg_replace('/[^a-zA-Z0-9\-]/', '', $id);
    }
}
