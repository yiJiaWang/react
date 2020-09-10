/**
 * Created by Administrator on 2/24.
 */
import queryString from 'query-string'
import _ from 'lodash'
import apiData from './apiData'
import fetchJsonp from 'fetch-jsonp'

const host = 'https://api.douban.com'
export const get = async(url, option) => {
	try {
		const res = await fetchJsonp(host + url, option)
		const json = await res.json()
		return json
	} catch (err) {
		return {}
	}
}
//连续箭头函数
// const getFromFile = (params) => data => new Promise((resolve) => {
// 	setTimeout(x => resolve(apiData[params][data.start === 0 ? '0' : '1']), 2000);
// })
function getFromFile(params) {
	// 闭包了
	return function(data){
		return new Promise((resolve) => {
			//模拟请求返回 用promise是为了.then
			setTimeout(x => resolve(apiData[params][data.start === 0 ? '0' : '1']), 2000);
		})
	}
}

// const _handleApi = (name) => (data, routeId, option) => (window.IS_PRO
// 	// || 1
// 	&& 0
// // ) ? getFromFile(name)(data) : get('/v2/movie/' + name + (routeId ? '/' + routeId : '') + ((data) ? '?' + queryString.stringify(data) : ''), option)
// ) ? getFromFile(name)(data) : getFromFile(name)(data) //假数据
//写这么复杂
// function _handleApi(name) {
// 	// 闭包了  name data
// 	return function(data, routeId, option){
// 		return getFromFile(name)(data)
// 	}
// }
function _handleApi(name) {
	// 闭包了  name data
		return getFromFile(name)
	
}

const apiList = ['top250', 'coming_soon', 'in_theaters', 'search', 'subject']
const api = _.reduce(apiList, (res, e, i) => {
	res[e] = _handleApi(e)  //一个函数 e:getFromFile(e/top250)(data)  // await api.in_theaters({start, count, city}) 
	return res//可以使用for + push 完成同样的效果
}, {});
export {api}

// -----------------------------------------
// <!-- 接收4个参数，第一个是要执行的数组，第二个是回调函数，第三个是初始参数，第4个是是否跳过第一个回调并拿第一个参数当做下一个回调的参数 -->
// 下一个函数的第一个参数是上一个的结果，初始参数是第一个函数的第一个参数。
// result, value, key
// 在本质上，闭包是将函数内部和函数外部连接起来的桥梁。