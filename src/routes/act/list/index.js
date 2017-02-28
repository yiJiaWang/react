import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
import './style.scss'
import * as action from './action';
import {api_const, api_type_const, show_model_const, name, reducer, actions} from './action';
import {hasBack} from '../../../components/Head'
import HeadRight from './components/HeadRight'
import {FList, FGrid} from './components/model'
import _ from 'lodash'
import Loading from '../../../components/Loading'

class FilmList extends Component {

	constructor(props) {
		super(props);
		this.menuList = _.map(api_const, (e, k) => ({text: e.title, event: this._getList(k)})).concat([{divider: 1}]).concat(_.map(show_model_const, (e, k) => ({text: e.title, event: props.actions.changeShowModel.bind(this, k)})))
	}

  componentWillMount() {
    const props = this.props,
      {movieList} = props;
    if (!movieList.get('list').size) this._getList(action.GET_LIST)();
  }

  _getList(method, params) {
    const props = this.props,
      {actions} = props;
		return async e => {
      actions.showLoading(1)
      await actions[api_type_const[method].method](params || {start: props.movieList.get('start')})
      actions.showLoading(0)
    }
  }

  searchBtn = showSearch => value => e => {
    const actions = this.props.actions;
    actions.showSearch(showSearch);
    if (!showSearch && value) {
      this._getList(action.GET_SEARCH_LIST, {q: value, start: this.props.movieList.get('start')})(e);
    }
  }

  render() {
    const props = this.props,
      {movieList} = props,
      {showModel, title, show, showSearch} = movieList.toJSON()

    return (
      <div>
        {hasBack({
          title: showSearch ? '' : title,
          iconElementRight:
            <HeadRight showSearch={showSearch} menuList={this.menuList} searchEvent={this.searchBtn(!showSearch)}/>
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
  component: handleClassForAsync(store)({name, reducer, actions})(FilmList)
})
