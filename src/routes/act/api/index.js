/**
 * Created by Administrator on 2/24.
 */

export const get = async(url, option) => {
	try {
		const res = await fetch(url, option)
		const json = await res.json()
		// console.log(JSON.stringify(json))
		return json
	} catch (err) {
		return {}
	}
}

import apiData from './apiData'
const getFromFile = (params) => JSON.parse(apiData[params])

import queryString from 'query-string'

export const in_theaters = (data, option) => {
	let _param = (data) ? '?' + queryString.stringify(data) : '';
	return (window.IS_PRO) ? getFromFile('in_theaters') : get('/v2/movie/in_theaters' + _param, option)
}
