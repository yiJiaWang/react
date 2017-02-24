/**
 * Created by Administrator on 2/24.
 */

export const get = async (url, option) => {
    try {
        const res = await fetch(url, option)
        const json = await res.json()
        return json
    } catch (err) {
        console.log(err);
        return {}
    }
}

export const in_theaters = option => get('/v2/movie/in_theaters', option)
