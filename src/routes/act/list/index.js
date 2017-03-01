import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
import './style.scss'
import * as action from './action';
import {api_const, api_type_const, show_model_const, name, reducer, actions} from './action';
import Head from '../../../components/Head'
import HeadRight from './components/HeadRight'
import {FList, FGrid} from './components/model'
import _ from 'lodash'
import Loading from '../../../components/Loading'

class FilmList extends Component {

  constructor(props) {
    super(props);
    this.menuList = _.map(api_const, (e, k) => ({
      text: e.title,
      event: this._getList(k, {start: 0})
    })).concat([{divider: 1}]).concat(_.map(show_model_const, (e, k) => ({
      text: e.title,
      event: props.actions.changeShowModel.bind(this, k)
    })))
    this._getList(action.GET_LIST, {start: 0})();
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

  goToDetail = id => e => this.props.router.push('/act/detail/' + id)

  moreBtn = e => {
    const {movieList, actions} = this.props;
    const start = movieList.get('start') + movieList.get('count');
    actions.setStart(start);
    this._getList(action.GET_LIST, {start})();
  }

  render() {
    const props = this.props,
      {movieList} = props,
      {showModel, title, show, showSearch} = movieList.toJSON(),
      listProps = {
        goToDetail: this.goToDetail,
        movieList: movieList
      }
    return (
      <div>
        <Head title={showSearch ? '' : title}
              iconElementRight={(<HeadRight showSearch={showSearch} menuList={this.menuList}
                                            searchEvent={this.searchBtn(!showSearch)}/>)}/>
        {showModel === 'list' ? (<FList {...listProps}/>) : (<FGrid {...listProps}/>)}
        <div styleName="moreBtn" onTouchTap={this.moreBtn}>点击加载更多</div>
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
