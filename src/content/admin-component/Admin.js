import { ContactSupportOutlined } from '@material-ui/icons';
import React, { Component } from 'react'
import './Admin.css';
import axios from 'axios'
import { useCookies } from 'react-cookie' 


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        htmlCode: ""
    }
}

  startServer = async () => {
    const apiActivitiesURL = "http://localhost:8000/polls/";

    await axios
      .get( 
          apiActivitiesURL, 
          {withCredentials: true, accessControlAllowCredentials: true, accessControlAllowOrigin: true, headers: {"Referer": "http://localhost:3000/admin"}}
        )
        .then( res => {
          this.setState({htmlCode: res.data});
          console.log('Response: ', res); }
        )
      .catch(err => { 
        console.log("Error status: ", err.response.status); 
        if (err.response.status === 403) {
          this.login();
        }
    });
  }

  login = async() => {
    console.log("!!!!!!!!!");
    await axios
      .get( 
          "http://localhost:8000/accounts/login/", 
          {withCredentials: true, accessControlAllowCredentials: true, accessControlAllowOrigin: true}
        )
      .then (
        res => {
          console.log(res);
          this.setState({htmlCode: res.data});
        }
      );
  }

    render() {
      if (this.state.htmlCode !== "") {
        return (
          <div dangerouslySetInnerHTML={{ __html: this.state.htmlCode }} />
        )
      }
      return (
          <div className="admin-flex-container admin-justify-left admin-margin-top-100">
              <button className="admin-button" onClick={() => this.startServer()}>Запустить сбор данных</button>
              <div className="admin-flex-container admin-justify-center admin-margin-top-30">
                    <div className="admin-self-align-center admin-line-div"></div>
            </div>
          </div>
      )
    }
}

export default Admin
