import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import style from './Layout.scss'
import animate from './animate.css'

class Layout extends Component {
	render() {
		return (
			<ReactCSSTransitionGroup component="div"
															 transitionName={animate}
															 transitionEnterTimeout={1000}
															 transitionLeaveTimeout={1000}
															 className={style.layout}
															 >
				{React.cloneElement(this.props.children, {
					key: location.pathname
				})}
			</ReactCSSTransitionGroup>
		)
	}
}

export default Layout
