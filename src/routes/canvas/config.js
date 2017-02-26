/**
 * Created by Administrator on 2/19.
 */

export const _con = {
	width: 330,
	height: 540,
	l: 30,
	hz: 200,
	aniHz: 50,
};

export default (x => {
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
		hz: 500,
		aniHz: 60,
	}
})()
