/**
 * Created by Administrator on 2/28.
 */
import React, {Component, PropTypes} from 'react'
import './style.scss'

export default class Loading extends Component {

  static propTypes: {
    show: PropTypes.boolean
  }

  render() {
    return <div styleName="box" style={{display: this.props.show ? '' : 'none'}}>
      <div styleName="mask"></div>
      <img styleName="maskImg" role="presentation" src={require('./loading-spinning-bubbles.svg')}/>
    </div>
  }
}
