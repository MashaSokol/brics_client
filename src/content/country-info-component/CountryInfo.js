import React from 'react'
import './CountryInfo.css';
import axios from 'axios'
import {Link} from "react-router-dom"


class CountryInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country: props.country,
            topOrganizations: null,
            topKeyWords: null
        }
    }

    componentDidMount() {
        this.fetchTopOrganizations();
        this.fetchTopKeyWords();
    }

    convertToRussian(country) {
        if (country === 'Russia') return 'Россия';
        if (country === 'Brazil') return 'Бразилия';
        if (country === 'China') return 'Китай';
        if (country === 'India') return 'Индия';
        if (country === 'South Africa') return 'Южно-Африканская Республика';
    }
     
    fetchTopOrganizations = async () => {
          const apiActivitiesURL = "http://localhost:8000/polls/organizations/top"; 
          console.log('{"country": ' + this.state.country + '}');
          const response = await axios.post(apiActivitiesURL, '{"country": "' + this.state.country + '"}'); // post-запрос с названием страны
          console.log('topOrganizations: ', response.data);
          this.setState(this.setState({
            topOrganizations: response.data
          })); 
    }
    normalzieName(name) {
        const normalName = name.replace(/\s/g, '').toLowerCase();
	    return normalName;
    }

  fetchTopKeyWords = async () => {
    const apiActivitiesURL = "http://localhost:8000/polls/keywords/top";
    const response = await axios.post(apiActivitiesURL, '{"country": "' + this.state.country + '"}');
    console.log('topKeywords: ', response.data);
    this.setState(this.setState({
        topKeyWords: response.data
    })); 
}

    render() {
        const pathToAllOrgs = '/' + this.normalzieName(this.state.country) + '/organizations';
        return (
            <div>
                <div className="country-header country-flex-container country-margin-auto country-margin-top-50">
                    <div className="country-app-name country-margin-left-auto ">{this.convertToRussian(this.state.country)}</div>
                </div>

                <div className="country-header country-flex-container country-margin-auto">

                    <div className="country-wrap-container country-justify-left country-top">
                        <div className="counrty-flex-container country-justify-center country-title">
                            <div className="country-self-align-center div-top-title">Топ организаций</div>
                        </div>
                        <div className="counrty-flex-container country-justify-center">
                            <div className="country-self-align-center country-line-div"></div>
                        </div>
                        {this.state.topOrganizations && this.state.topOrganizations.map((org, index) => {
                            return (
                                <div key={index} className="country-self-align-center div-uni-name">
                                    {index + 1}. {org.name}
                                </div>
                            );})
                        }
                        <div className="counrty-flex-container country-justify-center">
                            <Link to={pathToAllOrgs} className="non-decorated-text"><div className="country-self-align-center country-all-orgs-button">Все организации</div></Link>
                        </div>
                    </div> 

                    <div className="country-wrap-container country-justify-left country-top country-margin-left-10">
                        <div className="counrty-flex-container country-justify-center country-title">
                            <div className="country-self-align-center div-top-title">Топ ключевых слов</div>
                        </div>
                        <div className="counrty-flex-container country-justify-center">
                            <div className="country-self-align-center country-line-div"></div>
                        </div>
                        {this.state.topKeyWords && this.state.topKeyWords.map((kwd, index) => {
                            return (
                                <div key={index} className="country-self-align-center div-uni-name">
                                    {index + 1}. {kwd.name}
                                </div>
                            );})
                        }
                    </div> 
 
                </div>

            </div>
        )
    }
}

export default CountryInfo