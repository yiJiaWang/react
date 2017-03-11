/**
 * Created by Administrator on 2/18.
 */

export default (store) => ({
	path: 'jigsaw',
	getComponent: (location, callback) => require.ensure([], require => callback(null, require('./box').default(store)))
});

