// We only need to import the modules necessary for initial render
import Home from '../components/Home'//首页
import Layout from '../components/Layout'//子组件过度
//原生 route 数组对象
export const createRoutes = (store) => ({
	path: '/',
	component: Layout,//固定写法？？
	indexRoute: Home,//内置link跳转
	childRoutes: [
		require('./film').default(store),
		require('./canvas').default(store),
		require('./jigsaw').default(store),
		require('./flappybird').default(store),
		require('./redirect').default()
	]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
