/**
 * Created by Administrator on 2/27.
 */
import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import ViewModule from 'material-ui/svg-icons/action/view-module'
import Search from 'material-ui/svg-icons/action/search'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

export default class HeadRight extends Component {

  render() {
    const {menuList =[]} = this.props
    return <div style={{position: 'absolute', right: '0', display: 'flex'}}>
      <div>
        <IconButton>
          <Search color='rgb(255, 255, 255)'/>
        </IconButton>
      </div>
      <DropDownMenu style={{top: '-.2rem', width: '3.4rem'}} iconButton={(<ViewModule/>)} underlineStyle={{borderTop: '0'}}>
        {menuList.map(e => (
          <MenuItem primaryText="Never" onTouchTap={e.event}/>
        ))}
      </DropDownMenu>
    </div>
  }

}
