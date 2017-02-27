/**
 * Created by Administrator on 2/16.
 */
export default (store) => ({
  path: 'act',
  getChildRoutes(location, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./list').default(store),
        require('./list2').default(store),
      ])
    })
  },
});
