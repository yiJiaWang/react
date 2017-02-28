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
import _ from 'lodash'

const _handleApi = (name) => (data, option) => (window.IS_PRO
	// || 1
) ? getFromFile(name) : get('/v2/movie/' + name + ((data) ? '?' + queryString.stringify(data) : ''), option)

const apiList = ['coming_soon', 'in_theaters', 'search']
const api = _.reduce(apiList, (res, e, i) => {
	res[e] = _handleApi(e)
	return res
}, {});

export {api}
