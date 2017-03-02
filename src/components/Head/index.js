/**
 * Created by Administrator on 2/25.
 */

import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import './style.scss'
import {browserHistory} from 'react-router'
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

export default class Head extends Component {

  render() {
    const option = this.props,
      _option = !option.noBack ? { // 返回按钮
          ...option,
          iconElementLeft: (<IconButton ><ArrowBack /></IconButton>),
          onLeftIconButtonTouchTap: x => browserHistory.goBack()
        } : {...option}
    return <AppBar
      styleName="head"
      style={{position: 'fixed'}}
      {..._option}
    />
  }

}
