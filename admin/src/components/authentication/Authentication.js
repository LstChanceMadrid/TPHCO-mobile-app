import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'


import Login from './login/Login'
import Register from './register/Register'
import ResetPassword from './resetPassword/ResetPassword'

class Authentication extends Component {

    render() {

        
            return (
            <div>
                <Switch>
                    <Route exact path={'/'} component={Login} />
                    <Route exact path={'/register'} component={Register} />
                    <Route path={'/resetPassword/:token'} component={ResetPassword} />
                </Switch>
            </div>
            )
        }
    
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Authentication)
