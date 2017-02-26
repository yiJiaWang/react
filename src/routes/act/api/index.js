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

import queryString from 'query-string'

export const in_theaters = (data, option) => {
	let _param;
	if (data) _param = '?'+queryString.stringify(data);
	return get('/v2/movie/in_theaters' + _param, option)
}
