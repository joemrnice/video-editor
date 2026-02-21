<?php
declare(strict_types=1);

namespace VideoEditor\Api\Lib;

final class Validator
{
    private array $errors = [];
    private array $data   = [];

    public function __construct(private readonly array $input) {}

    public function required(string $field): self
    {
        if (!isset($this->input[$field]) || $this->input[$field] === '') {
            $this->errors[$field][] = "{$field} is required";
        } else {
            $this->data[$field] = $this->input[$field];
        }
        return $this;
    }

    public function email(string $field): self
    {
        $value = $this->input[$field] ?? '';
        if ($value !== '' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field][] = "{$field} must be a valid email";
        }
        return $this;
    }

    public function minLength(string $field, int $min): self
    {
        $value = $this->input[$field] ?? '';
        if (strlen((string)$value) < $min) {
            $this->errors[$field][] = "{$field} must be at least {$min} characters";
        }
        return $this;
    }

    public function maxLength(string $field, int $max): self
    {
        $value = $this->input[$field] ?? '';
        if (strlen((string)$value) > $max) {
            $this->errors[$field][] = "{$field} must not exceed {$max} characters";
        }
        return $this;
    }

    public function isValid(): bool { return empty($this->errors); }
    public function errors(): array { return $this->errors; }
    public function data(): array   { return $this->data; }

    public static function fromJson(): self
    {
        $body = (string)file_get_contents('php://input');
        $data = $body !== '' ? (array)(json_decode($body, true) ?? []) : [];
        return new self($data);
    }
}
