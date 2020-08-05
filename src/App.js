import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      indexValue: 0,
      textInput: 'cat'
    };
  }

  componentDidMount(){
    alert(process.env.REACT_APP_API_KEY);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_API_KEY+'&tags='+this.state.textInput+'&per_page=10&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      alert(JSON.stringify(j));
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="cats" src={srcPath}></img>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }

  NextHandler = () => {
    var currentIndex = this.state.indexValue;
    if(currentIndex === 9)
    {
      currentIndex = 0;
    }
    else {
      currentIndex++;
    }
    this.setState({indexValue: currentIndex});
  }

  PrevHandler = () => {
    var currentIndex = this.state.indexValue;
    if(currentIndex === 0)
    {
      currentIndex = 9;
    }
    else {
      currentIndex--;
    }
    this.setState({indexValue: currentIndex});
  }

  HandleChange = (e) => {
    this.setState({textInput: e.target.value});
  }

  Delay = (function(){
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <div>
            Picture #{this.state.indexValue}
          </div>
          {this.state.pictures[this.state.indexValue]}
        </p>
        <p>
          <input className="textInput" onChange={this.HandleChange} onKeyUp={() => this.Delay(function(){this.componentDidMount();
          }.bind(this), 1000)}>

          </input>
        </p>
        <div>
          <button onClick={this.PrevHandler}>
            Prev
          </button>&nbsp;
          <button onClick={this.NextHandler}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App;
