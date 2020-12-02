import React, {Component} from 'react'; //react
import {Provider} from 'react-redux';//提供（provide）了 store
import {useRouterHistory , Router} from 'react-router';//使用 React Router 实现自定义的 history
import createRoutes from './routes/index';//新建路由
import {store} from './store/createStore'
import './style/common.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'//页面颜色更鲜艳，动画效果更突出
import { createHistory} from 'history'

// Needed for onTouchTap yj
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const browserHistory = useRouterHistory(createHistory)({
  basename: "/react-app-ss"
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router
                        children={createRoutes(store)}
                        history={browserHistory}
                    />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
