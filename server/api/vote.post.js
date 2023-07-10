import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const client = serverSupabaseClient(event);
    const { data, error } = await client.from('votes_23j').insert(body).select('*');
    if(error === null) {
        return data;
    }else {
        return error;
    }
})