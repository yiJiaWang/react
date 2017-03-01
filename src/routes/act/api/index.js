/**
 * Created by Administrator on 2/24.
 */

export const get = async(url, option) => {
  try {
    const res = await fetch(url, option)
    const json = await res.json()
    return json
  } catch (err) {
    return {}
  }
}

import apiData from './apiData'
const getFromFile = (params) => (apiData[params])

import queryString from 'query-string'
import _ from 'lodash'

const _handleApi = (name) => (data, routeId, option) => (window.IS_PRO
  // || 1
) ? getFromFile(name) : get('/v2/movie/' + name + (routeId ? '/' + routeId : '') + ((data) ? '?' + queryString.stringify(data) : ''), option)

const apiList = ['coming_soon', 'in_theaters', 'search', 'subject']
const api = _.reduce(apiList, (res, e, i) => {
  res[e] = _handleApi(e)
  return res
}, {});

export {api}
