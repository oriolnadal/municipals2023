import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client.from('votes').select('*');
  if (error) {
    throw createError({ statusMessage: error.message })
  }
  if(new Date() > new Date(2023, 4, 28, 9)) {
  // if(true) {
    return data;
  }else {
    let publicVotingData = data.map(vote => {
      return {created_at:vote.created_at, name: vote.name, comments:vote.comments,}
    });
    return publicVotingData;
  }
})