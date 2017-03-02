/**
 * Created by Administrator on 2/19.
 */

export default (x => {
  // 根据窗口大小 生成canvas
	const clientWidth = document.body.clientWidth;
	const clientHeight = document.body.clientHeight;
	let l,
		l1 = (clientHeight - 150) / 18,
		l2 = (clientWidth - 20) / 11;
	l = ~~(l1 < l2 ? l1 : l2);
	return {
		width: l * 11,
		height: l * 18,
		l: l,
		hz: 500, // 下落速度
		aniHz: 60, // 刷新频率
	}
})()
