/**
 * Created by Administrator on 2/28.
 */
import React, {Component, PropTypes} from 'react'
import './style.scss'

/**
 *  loading组件
 */
export default class Loading extends Component {

  render() {
    return <div styleName="box" style={{display: this.props.show ? '' : 'none'}}>
      <div styleName="mask"></div>
      <img styleName="maskImg" role="presentation" src={require('./loading-spinning-bubbles.svg')}/>
    </div>
  }
}

Loading.propTypes = {
  show: React.PropTypes.bool
}
