import React from 'react'
import './OrganizationInfo.css';
import axios from 'axios'


// todo заменить имена классов на нормальные
class PubActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizationName: null,
            authorsTop: []
        }
    }

    componentDidMount() {
        this.fetchAuthorsTop();
    }
     
    fetchAuthorsTop = async() => {
        const apiAuthorsTopURL = "http://localhost:8000/bricsagentapplication/organization/authors/top";
        await axios.post(apiAuthorsTopURL, '{"organization_id" : ' + this.props.match.params.organizationId + "}").then(res => {
            this.setState({
                organizationName: res.data.organization_name,
                authorsTop: res.data.authors_top
            });
        });
        console.log("authors TOP: ", this.state.authorsTop);
    }

    render() {
        return (
            <div>
                <p>{this.state.organizationName}</p>
                {this.state.authorsTop && this.state.authorsTop.map((author, index) => {
                    return (
                        <div key={index}>
                            {author.name}
                            {author.count}
                        </div>
                    );})
                }
            </div>
        )
    }
}

export default PubActivity
