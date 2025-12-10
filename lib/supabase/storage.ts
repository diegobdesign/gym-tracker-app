import { createClient } from '@/lib/supabase/client'

/**
 * Upload an exercise image to Supabase Storage
 * @param file - The image file to upload
 * @returns The public URL of the uploaded image
 */
export async function uploadExerciseImage(file: File): Promise<string> {
  const supabase = createClient()

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('exercise-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  // Get public URL
  const { data } = supabase.storage
    .from('exercise-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

/**
 * Delete an exercise image from Supabase Storage
 * @param url - The public URL of the image to delete
 */
export async function deleteExerciseImage(url: string): Promise<void> {
  const supabase = createClient()

  // Extract file path from URL
  const path = url.split('/exercise-images/')[1]

  if (!path) {
    throw new Error('Invalid image URL')
  }

  const { error } = await supabase.storage
    .from('exercise-images')
    .remove([path])

  if (error) throw error
}
