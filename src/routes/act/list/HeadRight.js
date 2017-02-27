/**
 * Created by Administrator on 2/27.
 */
import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import ViewModule from 'material-ui/svg-icons/action/view-module'
import Search from 'material-ui/svg-icons/action/search'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

export default class HeadRight extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	handleOpen = (e) => {
		e.preventDefault();
		this.setState({
			open: true,
			anchorEl: e.currentTarget,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	render() {
		const {menuList = []} = this.props
		return <div style={{position: 'absolute', right: '0', display: 'flex'}}>
			<div>
				<IconButton>
					<Search color='rgb(255, 255, 255)'/>
				</IconButton>
				<IconButton onTouchTap={this.handleOpen}>
					<ViewModule color='rgb(255, 255, 255)'/>
				</IconButton>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
				>
					<Menu onItemTouchTap={this.handleRequestClose}>
						{menuList.map((e, i) => (
							<MenuItem key={i} primaryText={e.text} onTouchTap={e.event}/>
						))}
					</Menu>
				</Popover>
			</div>
		</div>
	}
}

