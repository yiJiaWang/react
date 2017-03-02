import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Layout.scss'

/**
 * 布局页面
 */
class Layout extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup component="div"
                               styleName="layout"
                               className="layout"
                               transitionName="fade"
                               transitionEnterTimeout={1000}
                               transitionLeaveTimeout={1000}
      >
        {React.cloneElement(this.props.children, {
          key: location.pathname
        })}
      </ReactCSSTransitionGroup>
    )
  }
}

export default Layout
