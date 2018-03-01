/**
 * Created by Administrator on 2/18.
 */

// import Canvas from './canvas'
export default (store) => ({
	path: 'flappybird',
	getComponent: (location, callback) => require.ensure([], require => callback(null, require('./flappybird').default))
});

