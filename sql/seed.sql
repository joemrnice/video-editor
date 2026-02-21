-- Video Editor Seed Data
-- Phase 1 scaffolding — minimal safe seed

SET NAMES utf8mb4;

-- Demo user (password: 'password' — bcrypt placeholder, replace before use)
INSERT IGNORE INTO `users` (`email`, `password_hash`, `display_name`, `role`)
VALUES (
    'demo@example.com',
    '$2y$12$placeholder_hash_replace_before_use_in_production_xxxxx',
    'Demo User',
    'editor'
);

-- Demo project
INSERT IGNORE INTO `projects` (`owner_id`, `name`, `description`, `fps`, `width`, `height`)
SELECT `id`, 'My First Project', 'Phase 1 seed project', 30, 1920, 1080
FROM `users` WHERE `email` = 'demo@example.com'
LIMIT 1;
