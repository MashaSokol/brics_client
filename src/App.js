import React from 'react'
import Header from './header-component/Header'
import Footer from './footer-component/Footer'
import PubActivity from './content/pub-activity-component/PubActivity'
import "./App.css"
import { Route, withRouter, Switch} from "react-router-dom"
import CountryInfo from './content/country-info-component/CountryInfo'
import CountryOrganizations from './content/country-organizations-component/CountryOrganizations'
import Admin from './content/admin-component/Admin'
import OrganizationInfo from './content/organization-info-component/OrganizationInfo'


class App extends React.Component {

  render() {
    return (
        <div className="app-container">
            <Header />
            <div className="app-main-div">
                <Switch>              
                  <Route exact={true} path='/' render={(props) => (<PubActivity {...props}/>)}/>

                  <Route exact path="/:country/info" component={CountryInfo} />
                  <Route exact path="/:country/organizations" component={CountryOrganizations} />
                  <Route exact path="/organizations/:organizationId/info" component={OrganizationInfo} />

                  <Route exact={true} path='/admin' render={() => (<Admin/>)}/>
                </Switch>
            </div>
          <Footer className="app-footer" />
        </div>
        )
  }
}

export default withRouter(App)