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
import {scrollDirect} from '../common/common'

class FilmList extends Component {

  constructor(props) {
    super(props);
    // 构建菜单按钮数据
    this.menuList = _.map(api_const, (e, k) => ({
      text: e.title,
      event: this._getList(k, {start: 0})
    })).concat([{divider: 1}]).concat(_.map(show_model_const, (e, k) => ({
      text: e.title,
      event: props.actions.changeShowModel.bind(this, k)
    })))
  }

  componentWillMount() {
    this.props.movieList.get('list').size === 0 && this._getList(action.GET_TOP250, {start: 0})();
  }

  componentDidMount() {
    const props = this.props;
    scrollDirect(direction => {
      if (direction === "down") {
        props.actions.showHead(false);
      }else if (direction === "up") {
        props.actions.showHead(true);
      }
    })
  }

  /**
   * 查询列表数据
   * @param method
   * @param params
   * @returns {function(*)}
   * @private
   */
  _getList = (method, params) => {
    const props = this.props,
      {actions} = props;
    return async e => {
      actions.showLoading(true)
      await actions[api_type_const[method].method](params || {start: props.movieList.get('start')})
      actions.showLoading(false)
    }
  }

  // 搜索按钮
  searchBtn = showSearch => value => e => {
    const actions = this.props.actions;
    actions.showSearch(showSearch);
    if (!showSearch && value) {
      this._getList(action.GET_SEARCH_LIST, {q: value, start: 0})(e);
    }
  }

  // 跳转详情页
  goToDetail = id => e => this.props.router.push('/film/detail/' + id)

  moreBtn = e => {
    const {movieList} = this.props;
    const start = movieList.get('start') + movieList.get('count'),
      q = movieList.get('q_value');
    this._getList(movieList.get('lastType'), {start, q})();
  }

  render() {
    const props = this.props,
      {movieList} = props,
      {noData, showModel, title, show, showSearch, showHead} = movieList.toJSON(),
      listProps = {
        goToDetail: this.goToDetail,
        movieList: movieList
      }
    return (
      <div>
        <Head styleName={showHead?"showHead":"hideHead"}
              title={showSearch ? '' : title}
              iconElementRight={(<HeadRight showSearch={showSearch} menuList={this.menuList}
                                            searchEvent={this.searchBtn(!showSearch)}/>)}/>
        {showModel === 'list' ? (<FList {...listProps}/>) : (<FGrid {...listProps}/>)}
        {noData
          ? (<div styleName="moreBtn">加载完</div>)
          : (<div styleName="moreBtn" onTouchTap={this.moreBtn}>点击加载更多</div>)}
        {show ? <Loading/> : ''}
      </div>
    )
  }
}

export default store => ({
  path: 'list',
  component: handleClassForAsync(store)({name, reducer, actions})(FilmList)
})
