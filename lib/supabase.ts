import { createClient } from '@supabase/supabase-js'

// Define types for your database tables
export type Advertisement = {
  id: string
  title: string
  description: string
  price: number
  created_at: string
  updated_at: string
  status: 'active' | 'inactive' | 'sold'
  views_count: number
  click_count: number
  normal_user_id: string | null
  business_owner_id: string | null
  category_id: string
}

export type BusinessOwner = {
  id: string
  email: string
  full_name: string
  phone: string
  profile_image: string | null
  business_name: string
  business_address: string
}

export type NormalUser = {
  id: string
  email: string
  full_name: string
  phone: string
  profile_image: string | null
}

export type Image = {
  id: string
  advertisement_id: string
  url: string
  order: number
}

export type Category = {
  id: string
  name: string
  parent_category_id: string | null
}

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const getAdvertisements = async () => {
  const { data, error } = await supabase
    .from('advertisements')
    .select(`
      *,
      normal_user:normal_user_id (*),
      business_owner:business_owner_id (*),
      category:category_id (*),
      images (*)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getAdvertisementById = async (id: string) => {
  const { data, error } = await supabase
    .from('advertisements')
    .select(`
      *,
      normal_user:normal_user_id (*),
      business_owner:business_owner_id (*),
      category:category_id (*),
      images (*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export const createAdvertisement = async (advertisement: Omit<Advertisement, 'id' | 'created_at' | 'updated_at' | 'views_count' | 'click_count'>) => {
  const { data, error } = await supabase
    .from('advertisements')
    .insert([advertisement])
    .select()
    .single()

  if (error) throw error
  return data
}

export const createUser = async (user: Omit<NormalUser, 'id'> | Omit<BusinessOwner, 'id'>, type: 'normal' | 'business', userId: string) => {
  const table = type === 'normal' ? 'normal_user' : 'business_owner'
  const { data, error } = await supabase
    .from(table)
    .insert([{ ...user, id: userId }])
    .select()
    .single()

  if (error) throw error
  return data
}

export const uploadImage = async (file: File, advertisementId: string, order: number) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${advertisementId}-${order}.${fileExt}`
  const filePath = `advertisements/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  const { data, error } = await supabase
    .from('images')
    .insert([{
      advertisement_id: advertisementId,
      url: publicUrl,
      order
    }])
    .select()
    .single()

  if (error) throw error
  return data
} 