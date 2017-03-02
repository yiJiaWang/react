/**
 * Created by Administrator on 3/2.
 */
/**
 * 重定向
 */
export default () => ({
	path: '*',
	indexRoute: {
		onEnter (nextState, replace) {
			replace('/')
		}
	}
})
