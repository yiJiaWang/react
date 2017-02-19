/**
 * Created by Administrator on 2/18.
 */
import React, {Component} from 'react'
import style from './style.scss'
import animate from './animate'

class Canvas extends Component {

	componentDidMount() {
		const move = animate().move;
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
