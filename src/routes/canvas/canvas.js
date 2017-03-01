/**
 * Created by Administrator on 2/18.
 */
import React, {Component} from 'react'
import './style.scss'
import animate from './animate'
import Head from '../../components/Head'
import FlatButton from 'material-ui/FlatButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import RotateRight from 'material-ui/svg-icons/image/rotate-right'

class Canvas extends Component {

	constructor(props){
		super(props);
		this.move = this.move.bind(this);
	}

	shouldComponentUpdate(){
		return false;
	}

	componentDidMount() {
		this.box = animate();
	}

	componentWillMount() {
	}

	move(type) {
		return e => {
			return this.box.move(type);
		}
	}

	render() {
		return (
			<div>
				<Head title="Tetris" />
				<div style={{paddingTop: 64}} styleName="box">
					<canvas styleName="canv" id="canv"></canvas>
					<section styleName="">
						方向键控制 上下左右
					</section>
					<div>
						<FlatButton onClick={this.move(38)} icon={(<RotateRight />)}></FlatButton>
						<FlatButton onClick={this.move(37)} icon={(<ArrowBack />)}></FlatButton>
						<FlatButton onClick={this.move(40)} icon={(<ArrowDown />)}></FlatButton>
						<FlatButton onClick={this.move(39)} icon={(<ArrowForward />)}></FlatButton>
					</div>
				</div>
			</div>
		)
	}
}

export default Canvas
