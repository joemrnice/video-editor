<?php
declare(strict_types=1);

namespace VideoEditor\Api\Models;

final class MediaAsset
{
    public function __construct(
        public readonly int     $id,
        public readonly int     $projectId,
        public readonly string  $filename,
        public readonly string  $mimeType,
        public readonly int     $sizeBytes,
        public readonly string  $storagePath,
        public readonly string  $createdAt,
        public readonly ?int    $durationMs = null,
        public readonly ?string $thumbnailPath = null,
    ) {}

    public static function fromRow(array $row): self
    {
        return new self(
            id:            (int)$row['id'],
            projectId:     (int)$row['project_id'],
            filename:      (string)$row['filename'],
            mimeType:      (string)$row['mime_type'],
            sizeBytes:     (int)$row['size_bytes'],
            storagePath:   (string)$row['storage_path'],
            createdAt:     (string)$row['created_at'],
            durationMs:    isset($row['duration_ms']) ? (int)$row['duration_ms'] : null,
            thumbnailPath: $row['thumbnail_path'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id'             => $this->id,
            'project_id'     => $this->projectId,
            'filename'       => $this->filename,
            'mime_type'      => $this->mimeType,
            'size_bytes'     => $this->sizeBytes,
            'storage_path'   => $this->storagePath,
            'created_at'     => $this->createdAt,
            'duration_ms'    => $this->durationMs,
            'thumbnail_path' => $this->thumbnailPath,
        ];
    }
}
