/**
 * Created by Administrator on 2/27.
 */

// 滚动条事件监听
export const scrollDirect = fn => {
  let flag = ""
  var beforeScrollTop = document.body.scrollTop
  window.addEventListener("scroll", function() {
    var afterScrollTop = document.body.scrollTop,
      delta = afterScrollTop - beforeScrollTop;
    if( delta === 0 ) return false;
    beforeScrollTop = afterScrollTop;
    const rid =  delta > 0 ? "down" : "up"
    if (rid === flag) return false
    flag = rid;
    fn(rid);
  }, false);
}

