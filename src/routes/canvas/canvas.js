/**
 * Created by Administrator on 2/18.
 */
import React, {Component} from 'react'
import style from './style.scss'
import animate from './animate'

class Canvas extends Component {

	componentDidMount() {
		const move = animate().move;
		function keyUp(e) {
			var currKey=0,e=e||event;
			currKey=e.keyCode||e.which||e.charCode;
			// console.log(currKey);
			move(currKey);
		}
		document.onkeyup = keyUp;
	}

	componentWillMount() {
	}

	_handleKey() {
		debugger

	}

	render() {
		return (
			<div className={style.box}>
				<canvas className={style.canv} id="canv"></canvas>
			</div>
		)
	}
}

export default Canvas
