-- =====================================================
-- ADD IMAGE_URL COLUMN TO EXERCISES TABLE
-- =====================================================

-- Add image_url column to exercises table
ALTER TABLE exercises
ADD COLUMN image_url TEXT;

-- Add comment for clarity
COMMENT ON COLUMN exercises.image_url IS 'URL to exercise image stored in Supabase Storage (exercise-images bucket)';
