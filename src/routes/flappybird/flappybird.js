/**
 * Created by Administrator on 2/18.
 */
import React, {Component} from 'react'
import './style.scss'
import Head from '../../components/Head'
import Main2 from './main.js'
import FlatButton from 'material-ui/FlatButton';
import RotateRight from 'material-ui/svg-icons/image/rotate-right'


class Canvas extends Component {

	constructor(props){
		super(props);
		this.state={ }
	}

	shouldComponentUpdate(){
		return false;
	}

	componentDidMount() {
    window.canvas = document.getElementById('canv_f')
    Main2()
	}

	componentWillMount() {
	}

	render() {
		return (
			<div>
				<Head title="Tetris" />
				<div style={{paddingTop: 64}} styleName="box">
					<canvas styleName="canv" id="canv_f"></canvas>
				</div>
        <div>
          <FlatButton style={{margin: 'auto', display: 'block'}} id="butten" icon={(<RotateRight />)}></FlatButton>
        </div>
			</div>
		)
	}
}

export default Canvas
