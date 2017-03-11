/**
 * Created by Administrator on 2/18.
 */
import React, {Component} from 'react'
import './style.scss'
import {handleClassForAsync} from '../../../store/reducers'
import {name, reducer, actions} from './action';
import Head from '../../../components/Head'

class Jigsaw extends Component {

	constructor(props) {
		super(props)
		const _self = this
		function keyUp(e) {
			if (_self.props.jigsaw.toJSON().msg) return
			var currKey = 0, _e = e || event;
			currKey = _e.keyCode || _e.which || _e.charCode;
			props.actions.move(currKey);
		}

		// 监听键盘
		document.onkeydown = keyUp;
	}

	render() {
		const props = this.props,
			{data, msg} = props.jigsaw.toJSON()
		return (
			<div>
				<Head title="Jigsaw" />
				<div style={{paddingTop: 64}} styleName="box">
					<h1 styleName="msg">{msg}</h1>
					<main styleName="picBox">
						{
							data.map(e1 => (<div key={e1}>
								{e1.map(e => (<span key={e}>{e}</span>))}
							</div>))
						}
					</main>
				</div>
			</div>
		)
	}
}

export default store => handleClassForAsync(store)({name, reducer, actions})(Jigsaw)
