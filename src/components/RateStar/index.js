/**
 * Created by Administrator on 2/28.
 */
import React, {Component} from 'react'
import './style.scss'
import Star from 'material-ui/svg-icons/toggle/star'
import StarHalf from 'material-ui/svg-icons/toggle/star-half'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

/**
 *  RateStar
 */
export default class RateStar extends Component {

  render() {
		const {rate, min, max, number, color, size} = this.props,
			unit = (max - min)/(number * 2)
		let _stars = [];
		for (let i = min; i < max;) {
			if (rate < i + unit) {
				_stars[_stars.length] = <StarBorder color={color} style={{width: size, height: size}}/>
			} else if (rate < i + 2* unit) {
				_stars[_stars.length] = <StarHalf color={color} style={{width: size, height: size}}/>
			} else {
				_stars[_stars.length] = <Star color={color} style={{width: size, height: size}}/>
			}
			i = i + 2 * unit
		}
    return <span styleName="box" >
			{_stars}
    </span>
  }

}

RateStar.defaultProps = {
	color: '#f56d4c',
	size: '12',
	min: 0,
	max: 10,
	number: 5,
	rate: 10
}

