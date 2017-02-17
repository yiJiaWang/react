/**
 * Created by Administrator on 2/16.
 */
export default (store) => ({
    path: 'act',
    childRoutes: [
        {path: 'list', getComponents: (location, callback) => require.ensure([], require => callback(null, require('./list').default(store)))}
    ]
});
