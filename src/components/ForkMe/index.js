/**
 * Created by Administrator on 2/25.
 */

import React, {Component} from 'react'
import './style.scss'

export default class ForkMe extends Component {

  render() {
    const props = this.props;
    return <span styleName="forkongithub"><a href={props.url || '#'}>Fork me on GitHub</a></span>
  }

}
