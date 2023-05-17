import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client.from('parties').select('*').order('id', {ascending: true});
  if (error) {
    throw createError({ statusMessage: error.message })
  }
  data?.forEach((party)=>{
    party.seats = 0;
  });
  return data;
})