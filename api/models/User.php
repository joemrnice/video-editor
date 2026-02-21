<?php
declare(strict_types=1);

namespace VideoEditor\Api\Models;

final class User
{
    public function __construct(
        public readonly int    $id,
        public readonly string $email,
        public readonly string $displayName,
        public readonly string $createdAt,
        public readonly string $role = 'user',
    ) {}

    public static function fromRow(array $row): self
    {
        return new self(
            id:          (int)$row['id'],
            email:       (string)$row['email'],
            displayName: (string)($row['display_name'] ?? $row['email']),
            createdAt:   (string)$row['created_at'],
            role:        (string)($row['role'] ?? 'user'),
        );
    }

    public function toArray(): array
    {
        return [
            'id'           => $this->id,
            'email'        => $this->email,
            'display_name' => $this->displayName,
            'created_at'   => $this->createdAt,
            'role'         => $this->role,
        ];
    }
}
