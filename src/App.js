import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

const particlesOption = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const intialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signIn',
  isSignedIn: false,
};

class App extends Component {
  constructor() {
    super();
    this.state = intialState;
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_SERVER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/11json',
      },
    })
      .then(response => response.json())
      .then(res=>console.log(res))
      .catch(console.log);
  }

  calculateFace = data => {
    // One face
    //const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const coordinates = [];
    data.outputs.forEach(output => {
      return output.data.regions.forEach(regions => {
        const face = regions.region_info.bounding_box;
        coordinates.push({
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - face.right_col * width,
          bottomRow: height - face.bottom_row * height,
          id: regions.id
        });
      });
    });
    return coordinates
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = async () => {
    try {
      this.setState({ imageURL: this.state.input });
      fetch(`${process.env.REACT_APP_SERVER_URL}/face`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then(res => res.json())
        .then(response => this.displayFace(this.calculateFace(response)))
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  displayFace = boxes => {
    this.setState({ boxes });
  };

  onRouteChange = route => {
    if (route === 'signOut') {
      this.setState(intialState);
    }
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, route, boxes } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOption} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageURL={imageURL} boxes={boxes} />
          </div>
        ) : route === 'signIn' ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
