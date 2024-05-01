import { serverSupabaseClient } from '#supabase/server'
import config from '../../config.json'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const client = serverSupabaseClient(event);
    const { data, error } = await client.from(config.votes_table_name).insert(body).select('*');
    if(error === null) {
        return data;
    }else {
        return error;
    }
})