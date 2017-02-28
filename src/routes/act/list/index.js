import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
import './style.scss'
import * as action from './action';
import {api_const} from './action';
import {hasBack} from '../../../components/Head'
import HeadRight from './components/HeadRight'
import {FList, FGrid} from './components/model'
import _ from 'lodash'
import Loading from '../../../components/Loading'

class FilmList extends Component {

  componentWillMount() {
    const props = this.props,
      {movieList} = props;
    if (!movieList.get('list').size) this._getList(action.GET_LIST)();
  }

  _getList(method) {
    const props = this.props,
      {actions} = props;
    return async params => {
      actions.showLoading(1)
      await actions[api_const[method].method](params)
      actions.showLoading(0)
    }
  }

  searchBtn = showSearch => value => e => {
    const actions = this.props.actions;
    actions.showSearch(showSearch);
    const _getSearchList = async value => {
      actions.showLoading(1)
      await actions.getSearchList(value)
      actions.showLoading(0)
    }
    if (!showSearch && value) {
      _getSearchList(value);
    }
  }

  render() {
    const props = this.props,
      {movieList} = props,
      {showModel, title, show, showSearch} = movieList.toJSON()

    const menuList = _.map(api_const, (e, k) => ({text: e.title, event: this._getList(k)}))
    return (
      <div>
        {hasBack({
          title: showSearch ? '' : title,
          iconElementRight:
            <HeadRight showSearch={showSearch} menuList={menuList} searchEvent={this.searchBtn(!showSearch)}/>
        })}
        {showModel === 'list' ? (<FList movieList={movieList}/>): (<FGrid movieList={movieList}/>)}
        <Loading show={show}/>
      </div>
    )
  }
}

FilmList.propTypes = {}

export default store => ({
  path: 'list',
  component: handleClassForAsync(store)(action)(FilmList)
})
