import React, {Component} from 'react'
import {Link} from 'react-router'
import style from './Home.scss'
import Head from '../Head'
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
	render() {
		return (
			<div className={style.home}>
				{Head({title: 'Welcome', showMenuIconButton: false})}
				<div style={{paddingTop: 64}} className={style.route}>
					<Link className={style.link} to="/act/list">
						<RaisedButton label="豆瓣电影 DEMO" primary={true}/>
					</Link>
					<Link className={style.link} to="/canvas">
						<RaisedButton label="俄罗斯方块 DEMO" primary={true}/>
					</Link>
				</div>
			</div>
		)
	}
}

export default Home
