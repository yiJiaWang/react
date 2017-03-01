/**
 * Created by Administrator on 3/1.
 */
import React, {Component} from 'react'
import {handleClassForAsync} from '../../../store/reducers'
// import './style.scss'
// import * as action from './action';
import {name, reducer, actions} from './action';
import Head from '../../../components/Head'

class FilmDetail extends Component {

  constructor(props) {
    super(props);
    const {actions, params} = this.props
    actions.getData(params.id)
  }

  componentWillMount() {
  }

  render() {
    const props = this.props
    return <div>
      <Head title=""

      />

    </div>
  }

}

export default store => ({
  path: 'detail/:id',
  component: handleClassForAsync(store)({name, reducer, actions})(FilmDetail)
})



