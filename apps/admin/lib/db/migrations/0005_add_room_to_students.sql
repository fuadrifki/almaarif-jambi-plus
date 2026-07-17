-- Migration: Add room field to students table
-- Date: 2025-01-01

ALTER TABLE students ADD COLUMN room VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE students ALTER COLUMN room SET NOT NULL;
