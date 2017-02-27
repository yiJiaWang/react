/**
 * Created by Administrator on 2/25.
 */

import React from 'react'
import AppBar from 'material-ui/AppBar';
import './style.scss'

const def = (option = {title:'title'}) => (
	<AppBar
		styleName="head"
		style={{position: 'fixed'}}
		{...option}
	/>
)

export default def

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

export const hasBack = (option = {title:'title'}) => {
	option.iconElementLeft = (<IconButton ><ArrowBack /></IconButton>)
	option.onLeftIconButtonTouchTap = x => history.back()
	return def(option)
}

