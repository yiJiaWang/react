/**
 * Created by Administrator on 2/28.
 */
import React, {Component} from 'react'
import './style.scss'
import RefreshIndicator from 'material-ui/RefreshIndicator';

/**
 *  loading组件
 */
export default class Loading extends Component {

  render() {
    return <div styleName="box" >
      <div styleName="mask"></div>
      <div styleName="maskImg">
        <RefreshIndicator
          size={40}
          left={-20}
          top={-20}
          status="loading"
        />
      </div>
    </div>
  }
}

