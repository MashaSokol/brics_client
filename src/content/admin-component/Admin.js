import React, { Component } from 'react'
import './Admin.css';
import axios from 'axios'


class Admin extends Component {

    constructor(props) {
      super(props);
      this.state = {
          htmlCode: "",
          countries: ["Brazil", "Russia", "India", "China", "South Africa"],
          country: "Brazil",
          inProgress: false,
          currentCountry:  "",
          progress: 0,
          timerId: null
      }
      this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    componentDidMount() {
      this.getProgress();
    }

    componentWillUnmount() {
      clearInterval(this.state.timerId);
    }

    setStateCountry = async(country) => {
      this.setState({country: country});
    }
    handleCountryChange = async (event) => {
      await this.setStateCountry(event.target.value);
      console.log("country: ", this.state.country);
    }

    getProgress = async() => {

      const apiProgressURL = "http://localhost:8000/bricsagentapplication/progress";

      await axios.get(apiProgressURL).then( res => {
        console.log("Progress: ", res.data);
        if (!res.data.in_progress) {
          console.log("stooooooooop");
          this.setState({inProgress: false,  currentCountry: ""});
          clearInterval(this.state.timerId);
          this.setState({timerId: null});            
          
        } else {
          this.setState ({
            progress: res.data.progress,
            currentCountry: res.data.country,
            inProgress: true
          });
          if (!this.state.timerId) {
            this.setState({timerId: setInterval(this.getProgress, 5000)});            
          }
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
                this.setState({
                  currentCountry: this.state.country
                });
                if (!this.state.timerId) {
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
              if (!this.state.inProgress) {
                this.setState({inProgress: true});
              }
              if (!this.state.timerId) {
                this.setState({timerId: setInterval(this.getProgress, 5000)});            
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

              <select  className="admin-self-align-center width-48 rounden-select" onChange={this.handleCountryChange}>
                                {this.state.countries && this.state.countries.map((country, index) => {
                                    return (
                                        <option className="rounden-select" key={index} value={country}>{country}</option>
                                    );})
                                }
              </select>

              <button className="admin-button admin-self-align-center" onClick={() => this.startServer()}>Запустить сбор данных</button>

              <div className="admin-self-align-center margin-right-0 admin-text">{this.state.currentCountry !== "" ? 'Проводится сбор для:' : ''} {this.state.currentCountry} {this.state.progress === 0 ? "" : parseFloat(this.state.progress).toFixed(2)+"%"}</div>
            </div>

            <div className="admin-block-container admin-justify-center admin-margin-top-30">
                <div className="admin-self-align-center admin-line-div">
                  <div className="progress-div" style={{width: this.state.progress+ "%"}}></div>
                </div>
            </div>

            


          </div>
      )
    }
}

export default Admin
