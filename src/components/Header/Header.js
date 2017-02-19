import React, {Component} from 'react'
import { Link } from 'react-router'
import style from './Header.scss'

class Header extends Component {
    render(){
        return (
            <div className={style.route}>
	            <Link to="/act">act</Link>
	            <Link to="/act/list">actList</Link>
	            <Link to="/canvas">canvas</Link>
            </div>
        )

    }
}

export default Header
