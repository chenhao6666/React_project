import  React, { Component } from 'react'

import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom' 
import App from '../App'
import Admin from '../Admin'

import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Board from '../pages/Board'
// import Attend from '../pages/Attend'
import Leave from '../pages/Leave'
import MyAttend from '../pages/MyAttend'
import Setting from '../pages/Setting'
import Login from '../pages/Login'


export default class extends Component {

    render() {
        
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path = '/login' component = { Login } />
                        <Route path = '/not-found' component = { NotFound } />

                        <Route path = '/' render = {() => (
                            <Admin>
                                <Switch>
                                    <Route  exact path = "/" component = { Home } />
                                    <Route exact path = "/board" component = { Board } />
                                    <Route exact path = "/attend/my-attend" component = { MyAttend } />
                                    <Route exact path = "/attend/leave" component = { Leave } />
                                    <Route exact path = "/more/setting" component = { Setting } />
                                    <Route path = "**" component = { NotFound }/>
                                    
                                </Switch>
                            </Admin>
                        )}/>
                        
                        
                        
                    </Switch>
                </App>
                
            </Router>
        
        )    
    }
}