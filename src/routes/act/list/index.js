import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
import * as action from './action';
import {hasBack} from '../../../components/Head'
import './style.scss'
import {box, list} from './model'
import {List, ListItem} from 'material-ui/List';
import HeadRight from './HeadRight'

class FilmList extends Component {

  static propTypes: {
    getList: React.PropTypes.func.isRequired,
    actList: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const props = this.props,
      {movieList, actions} = props;
    if (!movieList.get('list').size) actions.getList();
  }

  render() {
    const props = this.props,
      {movieList, actions} = props,
      {showModel, title} = movieList.toJSON();
    return (
      <div>
        {hasBack({title, iconElementRight: <HeadRight menuList={[{text: '123', event: actions.getComingSoonList}]}/>})}
        <List style={{paddingTop: 64}} styleName=''>
          {movieList.get('list').toJSON().map((e, i) => {
            return (
              <ListItem key={e.id}>
                {showModel === 'list' ? list({i, ...e}) : box({i, ...e})}
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

export default store => ({
  path: 'list',
  component: handleClassForAsync(store)(action)(FilmList)
})
