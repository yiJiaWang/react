import React, {Component} from 'react'
import {Link} from 'react-router'
// import style from './Home.scss'
import './Home.scss'
import Head from '../Head'
import RaisedButton from 'material-ui/RaisedButton';
import ForkMe from '../ForkMe'

/**
 * 首页
 */
class Home extends Component {
  render() {
    return (
      <div styleName="home">
        <Head title='Welcome' showMenuIconButton={false}/>
        <div style={{paddingTop: 64}} styleName="route">
          <Link styleName='link' to="/film/list">
            <RaisedButton label="豆瓣电影 " primary={true}/>
          </Link>
					<Link styleName='link' to="/canvas">
						<RaisedButton label="俄罗斯方块 " primary={true}/>
					</Link>
          <Link styleName='link' to="/jigsaw">
            <RaisedButton label="拼图 " primary={true}/>
          </Link>
          <Link styleName='link' to="/flappybird">
            <RaisedButton label="Flappybird " primary={true}/>
          </Link>
        </div>
        <ForkMe url="https://github.com/yiJiaWang/react.git"/>
      </div>
    )
  }
}

export default Home
