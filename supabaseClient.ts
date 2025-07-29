import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gouqewqzpnpfchkozaou.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXFld3F6cG5wZmNoa296YW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjU2MTQsImV4cCI6MjA2OTQwMTYxNH0.5kvgLPT2vgtcR5NlfBU9NnVe2FlDvlkWeiIdh7jHZDY'               // pegue de "anon public"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
