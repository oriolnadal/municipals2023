import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client.from('parties').select('*');
  if (error) {
    throw createError({ statusMessage: error.message })
  }
  data?.forEach((party)=>{
    party.seats = 0;
  });
  data.sort((a,b) => a.id - b.id);
  return data;
})