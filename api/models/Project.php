<?php
declare(strict_types=1);

namespace VideoEditor\Api\Models;

final class Project
{
    public function __construct(
        public readonly int     $id,
        public readonly string  $name,
        public readonly int     $ownerId,
        public readonly string  $createdAt,
        public readonly string  $updatedAt,
        public readonly ?string $thumbnailPath = null,
    ) {}

    public static function fromRow(array $row): self
    {
        return new self(
            id:            (int)$row['id'],
            name:          (string)$row['name'],
            ownerId:       (int)$row['owner_id'],
            createdAt:     (string)$row['created_at'],
            updatedAt:     (string)$row['updated_at'],
            thumbnailPath: $row['thumbnail_path'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'owner_id'      => $this->ownerId,
            'created_at'    => $this->createdAt,
            'updated_at'    => $this->updatedAt,
            'thumbnail_path'=> $this->thumbnailPath,
        ];
    }
}
