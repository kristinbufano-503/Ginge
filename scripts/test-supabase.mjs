import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing')
}

if (!supabaseKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const { data, error } = await supabase
  .from('categories')
  .select('*')
  .limit(5)

if (error) {
  console.error('Supabase connection failed:')
  console.error(error)
  process.exit(1)
}

console.log('Supabase connection successful.')
console.log('Categories returned:', data)