import { ContactSupportOutlined } from '@material-ui/icons';
import React, { Component } from 'react'
import './Admin.css';
import axios from 'axios'
import { useCookies } from 'react-cookie' 


class Admin extends Component {

    constructor(props) {
      super(props);
      this.state = {
          htmlCode: "",
          countries: ["Brazil", "Russia", "India", "China", "South Africa"],
          country: "Brazil",
          gettingProgress: false,
          currentCountry:  "",
          progress: 0,
          timerId: null
      }
      this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    componentDidMount() {
      this.getProgress();
    
      if (this.state.progress !== 100) {
        this.setState({gettingProgress: true});
        this.setState({timerId: setInterval(this.getProgress, 5000)});
      }

    }

    componentWillUnmount() {
      console.log(")))))))))))))))))");
      clearInterval(this.state.timerId);
    }

    handleCountryChange = async (event) => {
      const result = await this.setState({country: event.target.value});
      console.log("country: ", this.state.country);
    }

    getProgress = async() => {

      const apiProgressURL = "http://localhost:8000/bricsagentapplication/progress";

      await axios.get(apiProgressURL).then( res => {
        console.log("Progress: ", res.data);
        if ( res.data.progress === 100 ||  res.data.progress === 0) {
          console.log("stooooooooop");
          this.setState({gettingProgress: false});
          clearInterval(this.state.timerId);
          this.setState({
            progress: res.data.progress,
            currentCountry: res.data.country
          })
        } else {
          this.setState({
            currentCountry: res.data.country,
            progress: res.data.progress
          })
        }
      });
    }

    startServer = async () => {
      const apiActivitiesURL = "http://localhost:8000/bricsagentapplication/";
      await axios
        .post( 
              apiActivitiesURL, 
              '{"country": "' + this.state.country + '"}',
              {
                withCredentials: true, 
                accessControlAllowCredentials: true, 
                accessControlAllowOrigin: true
              }
            )
        .then( res => {
              if (res.data.length > 20) {
                  this.setState({htmlCode: res.data});
                  console.log('Response: ', res); 
                } else {
                  this.setState({htmlCode: ""});
                  this.setState({gettingProgress: true});
                  this.getProgress();
                  this.setState({timerId: setInterval(this.getProgress, 5000)});
                }
              } 
            )
        .catch(err => { 
            console.log("Error status: ", err.response); 
            if (err.response?.status === 401) {
              this.login();
            }
            if (err.response?.status === 423) {
              console.log("Сбор данных уже запущен");
              if (!this.state.gettingProgress) {
                this.setState({gettingProgress: true});
                setInterval(this.getProgress, 5000);
              }
            }
        });
    }

    login = async() => {
      await axios
        .get( 
            "http://localhost:8000/authentication/login/", 
            {
              withCredentials: true, 
              accessControlAllowCredentials: true, 
              accessControlAllowOrigin: true
            }
          )
        .then (
          res => {
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
          <div className="admin-block-container admin-justify-left admin-margin-top-100">

            <div  className="admin-flex-container">
              <button className="admin-button admin-self-align-center" onClick={() => this.startServer()}>Запустить сбор данных</button>
              <div className="admin-self-align-center margin-right-0">{this.state.currentCountry} {this.state.progress == 0 ? "" : parseFloat(this.state.progress).toFixed(2)+"%"}</div>
            </div>

            <div className="admin-block-container admin-justify-center admin-margin-top-30">
                <div className="admin-self-align-center admin-line-div">
                  <div className="progress-div" style={{width: this.state.progress+ "%"}}></div>
                </div>
            </div>

            <select  className="admin-self-align-center width-48" onChange={this.handleCountryChange}>
                                {this.state.countries && this.state.countries.map((country, index) => {
                                    return (
                                        <option key={index} value={country}>{country}</option>
                                    );})
                                }
            </select>


          </div>
      )
    }
}

export default Admin
