import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import createRoutes from './routes/index';
import createStore from './store/createStore'
import './style/common.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
