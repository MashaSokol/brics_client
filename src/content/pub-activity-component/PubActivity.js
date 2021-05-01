import React from 'react'
import './PubActivity.css';
import axios from 'axios'
import {Link} from "react-router-dom"
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';


// todo заменить имена классов на нормальные
class PubActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: null,
            period: null,
            organizationsTop: [],
            keywordsTop: []
        }
    }

    componentDidMount() {
        this.fetchPubActivities();
        this.fetchPeriod();
        this.fetchOrganizationsTop();
        this.fetchKeywordsTop();
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

    fetchOrganizationsTop = async() => {
        const apiOrganizationsTopURL = "http://localhost:8000/bricsagentapplication/organizations/all/top";
        await axios.get(apiOrganizationsTopURL).then(res => {
            this.setState({
                organizationsTop: res.data 
            });
        });
        console.log("TOP: ", this.state.organizationsTop);
    }
    fetchKeywordsTop = async() => {
        const apiKeywordsTopURL = "http://localhost:8000/bricsagentapplication/keywords/all/top";
        await axios.get(apiKeywordsTopURL).then(res => {
            this.setState({
                keywordsTop: res.data 
            });
        });
        console.log("TOP: ", this.state.keywordsTop);
    }

    // todo перенести
    convertToRussian(country) {
            if (country === 'Russia') return 'Россия';
            if (country === 'Brazil') return 'Бразилия';
            if (country === 'China') return 'Китай';
            if (country === 'India') return 'Индия';
            if (country === 'South Africa') return 'Южно-Африканская Республика';
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
                    <div className="width-80 flex top-40 margin-auto">
                        <div className="left-auto pub-title">Публикационная активность</div>
                    </div>
                    <div className="width-100 flex justify-center">
                        <div className="pub-horizontal-div"></div>
                    </div>
                    <div className="width-80 flex margin-auto">
                        <div className="left-auto pub-title-mini">За период с {this.state.period?.min_date} по {this.state.period?.max_date}</div>
                    </div>
                </div>

                <div className="width-80 margin-auto">
                    {activities && activities.map((activity, index) => {
                        return (
                            <div key={index} className="flex margin-auto">
                                <div  className="pub-activity-div-left flex justify-end self-center" style={{textAlign: 'end'}}>
                                    <Link to={activity.country +"/info"} className="self-center pub-link-text pub-activity-text">
                                            {this.convertToRussian(activity.country)}
                                    </Link>
                                </div>
                                <div  className="pub-activity-div-right flex justify-start self-center">
                                    <div className="self-center pub-activity-div" style={{width: this.getDivWidth(activity.count)}}></div>
                                    <Tooltip title="В таком количестве публикаций приняла участие данная страна" interactive placement="bottom-start">
                                        <div className="self-center pub-activity-text pub-activity-margin pointer">{activity.count}</div>
                                    </Tooltip>
                                </div>
                            </div>
                        );})
                    }

                </div>

                <div className="width-100 flex justify-center top-20">
                        <div className="pub-horizontal-div"></div>
                </div>

                <div className="flex width-80 margin-auto top-20">


                        <div  className="flex justify-between">
                            <div className="pub-activity-text pub-div-orgs-top">
                                <Tooltip title="В каком количестве публикаций приняла участие организация" interactive placement="bottom-start">
                                    <p className="pub-activity-text pub-margin-bottom-30 pointer">Топ организаций</p>
                                </Tooltip>
                                {this.state.organizationsTop && this.state.organizationsTop.map((organization, index) => {
                                    return (
                                        <div key={index} className="flex margin-auto">
                                            
                                                <Link className="pub-link-text" to={'organizations/' + organization.university_id + '/info'}>
                                                    {index+1}. {organization.name}, <span className="accentText"> {organization.count}</span>
                                                </Link>
                                            
                                        </div>
                                    );})
                                }
                            </div>
                            <div className="pub-vertical-div"></div>
                        </div>

                        <div className="pub-activity-text pub-div-keywords-top text-right ">
                            <Tooltip title="В каком количестве публикаций данное слово отмечено как ключевое" interactive placement="bottom-start">
                                <p className="pub-activity-text pub-margin-bottom-30 pointer">Топ ключевых слов</p>
                            </Tooltip>
                            {this.state.keywordsTop && this.state.keywordsTop.map((keyword, index) => {
                                return (
                                    <div key={index} className="flex justify-end">
                                        <div>{index+1}. {keyword.name}, <span className="accentText"> {keyword.count}</span></div>
                                    </div>
                                );})
                            }
                        </div>

                </div>
            </div>
        )
    }
}

export default PubActivity
