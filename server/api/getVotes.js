import { serverSupabaseClient } from '#supabase/server'
import config from '../../config.json'


export default defineEventHandler(async (event) => {
  process.env.TZ = 'Europe/Madrid';
  const client = serverSupabaseClient(event)
  const { data, error } = await client.from(config.votes_table_name).select('*').order('created_at', {ascending: false});
  if (error) {
    throw createError({ statusMessage: error.message })
  }
  const closingDate = new Date(config.closing_voting_time);
  if(new Date() > closingDate) {
    return data;
  }else {
    let publicVotingData = data.map(vote => {
      return {created_at:vote.created_at, name: vote.name, comments:vote.comments,}
    });
    return publicVotingData;
  }
})