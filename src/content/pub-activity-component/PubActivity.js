import React from 'react'
import './PubActivity.css';
import axios from 'axios'
import {Link, withRouter} from "react-router-dom"


// todo заменить имена классов на нормальные
// todo закешировать активность на сервере
class PubActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: null,
            period: null
        }
    }

    componentDidMount() {
        this.fetchPubActivities();
        this.fetchPeriod();
    }
     
    fetchPubActivities = async () => {
          const apiActivitiesURL = "http://localhost:8000/bricsagentapplication/activity";
          const response = await axios.get(apiActivitiesURL);
          console.log('ACT: ', response.data);
          this.setState(this.setState({
            activities: response.data
          })); 
    }

    fetchPeriod = async () => {
        const apiPeriodURL = "http://localhost:8000/bricsagentapplication/statistic/period";
        const response = await axios.get(apiPeriodURL);
        console.log('Period: ', response.data);
        this.setState(this.setState({
          period: response.data
        })); 
    }

    normalzieName(name) {
        const normalName = name.replace(/\s/g, '').toLowerCase();
	    return normalName;
    }

    getDivWidth(count) {
        let sum = 0;
        this.state.activities.forEach(activity => {
            sum += activity.count;
        });
        const width = count*100/sum*5;
        console.log("Sum: ", sum);
        console.log("%: ", width);
        return width;
    }

    render() {
        const { activities } = this.state;
        return (
            <div>
                <div>
                    <div className="pub-width-80 pub-flex-container pub-margin-top-5 pub-margin-auto">
                        <div className="pub-margin-left-auto pub-title">Публикационная активность</div>
                    </div>
                    <div className="pub-width-100 pub-flex-container pub-justify-center">
                        <div className="pub-line-div"></div>
                    </div>
                    <div className="pub-width-80 pub-flex-container pub-margin-auto">
                        <div className="pub-margin-left-auto pub-title-mini">За период с {this.state.period?.min_date} по {this.state.period?.max_date}</div>
                    </div>
                </div>

                <div className="countries-activity">
                    {activities && activities.map((activity, index) => {
                        return (
                            <div key={index} className="country-activity pub-flex-container pub-margin-auto">
                                <div  className="country-activity-div-left pub-flex-container pub-justify-right pub-self-align-center">
                                    <Link to={this.normalzieName(activity.country)} className="pub-self-align-center pub-link-text  pub-activity-text app-margin-left-auto">{activity.country}</Link>
                                </div>
                                <div  className="country-activity-div-right pub-flex-container pub-justify-left pub-self-align-center">
                                    <div className="pub-self-align-center pub-activity-div" style={{width: this.getDivWidth(activity.count)}}></div>
                                    <div className="pub-self-align-center pub-activity-text">{activity.count}</div>
                                </div>
                            </div>
                        );})
                    }
                </div>
            </div>
        )
    }
}

export default PubActivity