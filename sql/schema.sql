-- Video Editor Database Schema
-- Compatible with MySQL 8.0+ / MariaDB 10.6+
-- Generated: Phase 1 scaffolding

SET NAMES utf8mb4;
SET foreign_key_checks = 0;

-- ─────────────────────────────────────────
-- Users
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `users` (
    `id`           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `email`        VARCHAR(255) NOT NULL UNIQUE,
    `password_hash`VARCHAR(255) NOT NULL,
    `display_name` VARCHAR(100) NOT NULL,
    `role`         ENUM('admin','editor','viewer') NOT NULL DEFAULT 'editor',
    `created_at`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────
-- Projects
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `projects` (
    `id`             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `owner_id`       BIGINT UNSIGNED NOT NULL,
    `name`           VARCHAR(255) NOT NULL,
    `description`    TEXT,
    `fps`            TINYINT UNSIGNED NOT NULL DEFAULT 30,
    `width`          SMALLINT UNSIGNED NOT NULL DEFAULT 1920,
    `height`         SMALLINT UNSIGNED NOT NULL DEFAULT 1080,
    `duration_ms`    INT UNSIGNED NOT NULL DEFAULT 0,
    `thumbnail_path` VARCHAR(500),
    `created_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_projects_owner` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────
-- Media Assets
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `media_assets` (
    `id`             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `project_id`     BIGINT UNSIGNED NOT NULL,
    `filename`       VARCHAR(255) NOT NULL,
    `original_name`  VARCHAR(255) NOT NULL,
    `mime_type`      VARCHAR(100) NOT NULL,
    `size_bytes`     BIGINT UNSIGNED NOT NULL,
    `storage_path`   VARCHAR(500) NOT NULL,
    `duration_ms`    INT UNSIGNED,
    `thumbnail_path` VARCHAR(500),
    `created_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_media_project` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET foreign_key_checks = 1;
