import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import Dashboard from './main/dashboard/Dashboard'
import EnergyTechWeekly from './main/energyTechWeekly/EnergyTechWeekly';
import Footer from './footer/Footer'
import Header from './header/Header'
import Login from '../authentication/login/Login'
import Main from './main/Main'
import NewIssue from './main/energyTechWeekly/newIssue/NewIssue'
import Stocks from './main/stocks/Stocks'
import TPHEvents from './main/tPHEvents/TPHEvents'


export default class Admin extends Component {
  render() {
    return (
      <div>
        <Header />

        <Main>
            <Switch>
                <Route exact path={'/'} component={Stocks} />
                <Route exact path={'/admin/dashboard'} component={Dashboard} />
                <Route exact path={'/admin/stocks'} component={Stocks} />
                {/* <Route exact path={'/admin/stocks/editStock'} component={EditStock} /> */}
                <Route exact path={'/admin/energyTechWeekly'} component={EnergyTechWeekly} />
                <Route exact path={'/admin/energyTechWeekly/newIssue'} component={NewIssue} />
                {/* <Route exact path={'/admin/energyTechWeekly/editIssue'} component={EnergyTechWeekly} /> */}
                <Route exact path={'/admin/tPHEvents'} component={TPHEvents} />
                {/* <Route exact path={'/admin/tPHEvents/addEvent'} component={TPHEvents} />
                <Route exact path={'/admin/tPHEvents/editEvent'} component={EnergyTechWeekly} /> */}
            </Switch>
        </Main>
        
        <Footer />
      </div>
    )
  }
}
