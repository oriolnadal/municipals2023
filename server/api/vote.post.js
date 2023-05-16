import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log("bodyy", body);
    const client = serverSupabaseClient(event);
    const { data, error } = await client.from('votes').insert(body).select('*');
    if(error === null) {
        return data;
    }else {
        return error;
    }
})