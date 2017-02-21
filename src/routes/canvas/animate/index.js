/**
 * Created by Administrator on 2/18.
 */
import Box from './box'
import _ from 'lodash'
import config from '../config'

const debugs = o => {
	debugger;
	return o;
}
const run = obj => obj.run()
const draw = _.curry((context, obj) => {
	return obj.draw(context)
})
const run_draw = context => _.flowRight(run, draw(context))
const animate = _.curry((context, box) => {
		box.stop ? '' :
		setTimeout(x => {
			return animate(context)(run_draw(context)(box))
		}, config.hz)
	}
)

function init() {
	const canvas = document.getElementById('canv');
	const context = canvas.getContext('2d');
	canvas.width = config.width;
	canvas.height = config.height;
	const box = new Box();
	animate(context)(box);
	return box
}

export default init
