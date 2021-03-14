import React, {Component, useEffect, useState} from 'react'
import Header from './header-component/Header'
import PubActivity from './content/pub-activity-component/PubActivity'
import axios from 'axios'


// class App extends Component {

  // state = { characters: [
  //   {
  //     name: 'Charlie',
  //     job: 'Janitor',
  //   },
  //   {
  //     name: 'Mac',
  //     job: 'Bouncer',
  //   },
  //   {
  //     name: 'Dee',
  //     job: 'Aspring actress',
  //   },
  //   {
  //     name: 'Dennis',
  //     job: 'Bartender',
  //   },
  // ]}

//   removeCharacter = (index) => {
//     const {characters} = this.state
  
//     this.setState({
//       characters: characters.filter((character, i) => {
//         return i !== index
//       }),
//     })
//   }

//   render() {
//     const { characters } = this.state
//     return (
//       <div className="container">
//         <Table characterData={characters} removeCharacter={this.removeCharacter} />
//       </div>
//     )
//   }

// }

// export default App
function App() {

  const [articles, setArticles] = useState(null);
  const apiURL = "http://localhost:8000/polls/articles/some";
  const fetchData = async () => {
      const response = await axios.get(apiURL)
      console.log('articles: ', response.data);
      setArticles(response.data) 
  }

  const [activities, setActivities] = useState(null);
  const apiActivitiesURL = "http://localhost:8000/polls/activity";
  useEffect(() => {
    const fetchPubActivities = async () => {
        const response = await axios.get(apiActivitiesURL)
        console.log('ACT: ', response.data);
        setActivities(response.data) 
    };
    fetchPubActivities();
  }, []);


  return (
// передавать загруженные данные по активности в компонент pubActivity
    <div className="App">
      <Header></Header>
      <PubActivity></PubActivity>
      <div>
        {activities && activities.map((activity, index) => {
            return (
              <div key={index}>
                  <p>{activity.country}: {activity.count} articles</p>
              </div>
            );})
        }
      </div>
    </div>
  )
}

export default App