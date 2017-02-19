import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import createRoutes from './routes/index';
import createStore from './store/createStore'
import './style/common.css'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router
                    children={createRoutes(store)}
                    history={browserHistory}
                />
            </Provider>
        );
    }
}

export default App;
