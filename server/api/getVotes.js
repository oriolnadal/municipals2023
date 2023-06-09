import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  process.env.TZ = 'Europe/Madrid';
  const client = serverSupabaseClient(event)
  const { data, error } = await client.from('votes_23j').select('*').order('created_at', {ascending: false});
  if (error) {
    throw createError({ statusMessage: error.message })
  }
  if(new Date() > new Date(2023, 6, 23, 9)) {
  // if(true) {
    return data;
  }else {
    let publicVotingData = data.map(vote => {
      return {created_at:vote.created_at, name: vote.name, comments:vote.comments,}
    });
    return publicVotingData;
  }
})