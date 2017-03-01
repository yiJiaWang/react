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
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import './HeadRight.scss'

export default class HeadRight extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			searchValue: '',
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

	handleSearchChange = e => {
		this.setState({
			searchValue: e.target.value,
		})
	}

	render() {
		const {menuList = [], showSearch = false, searchEvent} = this.props
		return <div style={{position: 'absolute', right: '0', display: 'flex'}}>
			<div>
				<TextField
					id="search_q"
					style={{display: showSearch ? '' : 'none', position: 'absolute', left: '-16rem'}}
					styleName={showSearch ? 'searchShow' : 'searchHide'}
					underlineFocusStyle={{borderColor: '#202125', borderBottom: 'solid 1px'}}
					onChange={this.handleSearchChange}
					value={this.state.searchValue}
				/>
				<IconButton onTouchTap={searchEvent(this.state.searchValue)}>
					<Search color='rgb(255, 255, 255)'/>
				</IconButton>
				<IconButton onTouchTap={this.handleOpen}>
					<ViewModule color='rgb(255, 255, 255)'/>
				</IconButton>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
				>
					<Menu onItemTouchTap={this.handleRequestClose}>
						{menuList.map((e, i) => (
							e.divider ? <Divider key={i}/> : <MenuItem key={i} primaryText={e.text} onTouchTap={e.event}/>
						))}
					</Menu>
				</Popover>
			</div>
		</div>
	}
}

