import React, {useEffect, useState} from 'react'
import Header from './header-component/Header'
import Footer from './footer-component/Footer'
import PubActivity from './content/pub-activity-component/PubActivity'
import "./App.css"
import { Route, withRouter, Switch, Redirect} from "react-router-dom"
import CountryInfo from './content/country-info-component/CountryInfo'
import CountryOrganizations from './content/country-organizations-component/CountryOrganizations'
import Admin from './content/admin-component/Admin'


class App extends React.Component {

  render() {
    return (
        <div className="app-container">
            <Header />
            <div className="app-main-div">
                <Switch>              
                  <Route exact={true} path='/' render={(props) => (<PubActivity {...props}/>)}/>
                  <Route exact={true} path='/brazil' render={(props) => (<CountryInfo {...props} country="Brazil"/>)}/>
                  <Route exact={true} path='/russia' render={(props) => (<CountryInfo {...props} country="Russia"/>)}/>
                  <Route exact={true} path='/china' render={(props) => (<CountryInfo {...props} country="China"/>)}/>
                  <Route exact={true} path='/india' render={(props) => (<CountryInfo {...props} country="India"/>)}/>
                  <Route exact={true} path='/southafrica' render={(props) => (<CountryInfo {...props} country="South Africa"/>)}/>
                  <Route exact={true} path='/brazil/organizations' render={(props) => (<CountryOrganizations {...props} country="Brazil"/>)}/>
                  <Route exact={true} path='/russia/organizations' render={(props) => (<CountryOrganizations {...props} country="Russia"/>)}/>
                  <Route exact={true} path='/china/organizations' render={(props) => (<CountryOrganizations {...props} country="China"/>)}/>
                  <Route exact={true} path='/india/organizations' render={(props) => (<CountryOrganizations {...props} country="India"/>)}/>
                  <Route exact={true} path='/southafrica/organizations' render={(props) => (<CountryOrganizations {...props} country="South Africa"/>)}/>
                  <Route exact={true} path='/admin' render={() => (<Admin/>)}/>
                </Switch>
            </div>
          <Footer className="app-footer" />
        </div>
        )
  }
}

export default withRouter(App)