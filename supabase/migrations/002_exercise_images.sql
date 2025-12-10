-- =====================================================
-- EXERCISE IMAGES STORAGE BUCKET
-- =====================================================
-- Create storage bucket for exercise images

INSERT INTO storage.buckets (id, name, public)
VALUES ('exercise-images', 'exercise-images', true);

-- =====================================================
-- STORAGE POLICIES
-- =====================================================

-- Allow public read access to exercise images
CREATE POLICY "Public read access for exercise images"
ON storage.objects FOR SELECT
USING (bucket_id = 'exercise-images');

-- Allow authenticated users to upload exercise images
CREATE POLICY "Authenticated users can upload exercise images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'exercise-images'
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update own exercise images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'exercise-images' AND auth.uid() = owner);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own exercise images"
ON storage.objects FOR DELETE
USING (bucket_id = 'exercise-images' AND auth.uid() = owner);
