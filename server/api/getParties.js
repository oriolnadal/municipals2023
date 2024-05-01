import { serverSupabaseClient } from '#supabase/server'
import config from '../../config.json'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client.from(config.parties_table_name).select('*').order('seats', {ascending: false});
  if (error) {
    throw createError({ statusMessage: error.message })
  }
  return data;
})