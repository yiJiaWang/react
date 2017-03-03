/**
 * Created by Administrator on 2/16.
 */
export default (store) => ({
  path: 'film',
  getChildRoutes(location, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./list').default(store),
        require('./detail').default(store),
      ])
    })
  },
});
