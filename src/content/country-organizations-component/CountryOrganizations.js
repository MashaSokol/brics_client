import React from 'react'
import './CountryOrganizations.css';
import axios from 'axios'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


class CountryOrganizations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country: null,
            organizations: [],
            page: 1,
            searchLine: "",
            countFrom: 0,
            countUntill: 0,
            searchMode: false
        }
        this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
        this.handleInputCountFrom = this.handleInputCountFrom.bind(this);
        this.handleInputCountUntill = this.handleInputCountUntill.bind(this);
    }

    setStateSearchLine = async (line) => {
        this.setState({searchLine: line});
    }
    setStatePage = async (page) => {
        this.setState({page: page});
    }

    handleInputSearchChange = async (event) => {  
        if (event.target.value === "" && (this.state.countFrom === 0 || this.state.countFrom === "") && (this.state.countUntill === 0 || this.state.countUntill==="")) {
            console.log("CLEAR");
            this.resetSearchMode();
        }
        await this.setStateSearchLine(event.target.value);
    }
    handleInputCountUntill = async (event) => {  
        if (this.state.searchLine === "" && (this.state.countFrom === 0 || this.state.countFrom === "") && (event.target.value === 0 || event.target.value==="")) {
            console.log("CLEAR");
            this.resetSearchMode();
        }
        this.setState({countUntill: event.target.value});
    }
    handleInputCountFrom = async (event) => {  
        if (this.state.searchLine === "" && (event.target.value === 0 || event.target.value === "") && (this.state.countUntill === 0 || this.state.countUntill === "" )) {
            console.log("CLEAR");
            this.resetSearchMode();
        }
        this.setState({countFrom: event.target.value});
    }

    setStateCountry = async() => {
        this.setState({ country: this.props.match.params.country });
    } 
    getData = async() => {
        await this.setStateCountry();
        await this.fetchOrganizations();
    }
    componentDidMount() {
        this.getData();
        
    }

    convertToRussian(country) {
        if (country === 'Russia') return 'Россия';
        if (country === 'Brazil') return 'Бразилия';
        if (country === 'China') return 'Китай';
        if (country === 'India') return 'Индия';
        if (country === 'SouthAfrica') return 'Южно-Африканская Республика';
    }
    declensionedCountryName() {
        if (this.state.country === "Russia") return "России";
        if (this.state.country === "Brazil") return "Бразилии";
        if (this.state.country === "China") return "Китая";
        if (this.state.country === "India") return "Индии";
        if (this.state.country === "South Africa") return "Южно-Африканской Республики";
    }



    fetchOrganizations = async () => {
        console.log("fetching organizations... page: ", this.state.page, " ... ", this.state.country);
        const apiActivitiesURL = "http://localhost:8000/bricsagentapplication/organizations/limit"; // post-запрос с названием страны
        const response = await axios.post(apiActivitiesURL, '{"country": "'+ this.state.country +'", "page": '+ this.state.page+'}');
        console.log('limitOrganizations: ', response.data);
        this.setState(this.setState({
            organizations: response.data
        })); 
    }
    Search = async() => {
        if (!this.state.searchMode) {
            await this.setStatePage(1);         
        }
        this.setState({searchMode: true});
        const apiSearchURL = "http://localhost:8000/bricsagentapplication/organizations/search";
        const response = await axios.post(apiSearchURL, '{"search_text": "'+ this.state.searchLine +'", "country": "' + this.state.country + '","page": '+ this.state.page+', "count_from":' + this.state.countFrom +', "count_to" : ' + this.state.countUntill + '}');
        console.log('{"search_text": "'+ this.state.searchLine +'", "country": "' + this.state.country + '","page": '+ this.state.page+', "count_from":' + this.state.countFrom +', "count_to" : ' + this.state.countUntill + '}');
        console.log('searched Organizations: ', response.data);
        this.setState(this.setState({
            organizations: response.data
        })); 
    }


    DecreasePage = async() => {
        const oldPage = this.state.page;
        if (oldPage > 1) {
            const newPage = oldPage - 1;
            await this.setStatePage(newPage);  
        }
    }
    DecreasePageAndGetOrgs = async () => {
        await this.DecreasePage();
        if (!this.state.searchMode) {
            await this.fetchOrganizations();
        }
        else {
            await this.Search();
        }
    }
    IncreasePage = async() => {
        const oldPage = this.state.page;
        const newPage = oldPage + 1;
        await this.setStatePage(newPage);   
    }
    IncreasePageAndGetOrgs= async () => {
        if (this.state.organizations.length>=10) {
            await this.IncreasePage();
            if (!this.state.searchMode) {
                await this.fetchOrganizations();
            }
            else {
                await this.Search();
            }
        }
    }

    resetSearch() {
        this.resetSearchMode();
        this.clearInputs();
    }
    resetSearchMode = async() => {
        await this.setStatePage(1);
        this.setState({searchMode: false});
        await this.fetchOrganizations();
    }
    clearInputs() {
        document.getElementById("searchInput").value = "";
        document.getElementById("fromInput").value = "";
        document.getElementById("toInput").value = "";
    }

    render() {

        return (
            <div>

                <div>

                    <div className="orgs-width-80 orgs-flex-container orgs-margin-top-50 orgs-margin-auto">
                        <div className="orgs-margin-left-auto orgs-title">Организации {this.declensionedCountryName()}</div>
                    </div>

                    <div className="orgs-width-100 orgs-flex-container orgs-justify-center">
                        <div className="orgs-line-div"></div>
                    </div>

                    <div className="orgs-width-80 orgs-flex-container orgs-justify-center orgs-margin-auto orgs-margin-top-35 orgs-text">
                        <input id="searchInput" placeholder="поиск" onChange={this.handleInputSearchChange} className="orgs-self-align-start orgs-big-input orgs-margin-left-0"/>


                        <div className="orgs-flex-container orgs-justify-center orgs-margin-auto">
                            <span  className="orgs-self-align-center">Количество публикаций:</span>
                            <span  className="orgs-self-align-center orgs-margin-left-20">от</span>
                            <input id="fromInput" type="number" onChange={this.handleInputCountFrom} className="orgs-little-input orgs-margin-left-20"/>
                            <span  className="orgs-self-align-center orgs-margin-left-20">до</span>
                            <input id="toInput" type="number" onChange={this.handleInputCountUntill} className="orgs-little-input orgs-margin-left-20"/>
                        </div>
                        <CloseIcon  className="orgs-self-align-center orgs-icon" onClick={() => this.resetSearch()}/>
                        <SearchIcon className="orgs-self-align-center orgs-icon" onClick={() => this.Search()}/>

                        <div className="orgs-flex-container orgs-justify-end orgs-margin-left-auto">
                        <ChevronLeftIcon className="pagesIcon"  onClick={() => this.DecreasePageAndGetOrgs()}/>
                            <span className="pagesNumbers">{this.state.page}</span>
                        <ChevronRightIcon className="pagesIcon" onClick={() => this.IncreasePageAndGetOrgs()}/>
                    </div>
                        
                    </div>

                </div>

                <div className="orgs-width-80 orgs-block-container orgs-justify-center orgs-margin-auto ">
                    <div className="orgs-height-580">
                        <div className="orgs-margin-top-50">
                            {this.state.organizations && this.state.organizations.map((org, index) => {
                                return (
                                    <div key={index} className="orgs-name-div orgs-flex-container orgs-justify-between">
                                        <div className="orgs-self-align-center">{org.name}</div>
                                        <div className="orgs-self-align-center orgs-count">{org.count}</div>
                                    </div>
                                );})
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CountryOrganizations