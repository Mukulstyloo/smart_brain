import React,{Component} from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import Rank from './component/Rank/Rank';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Signin from './component/Signin/Signin';
import Register from './component/Register/Register';
import './App.css';
import 'tachyons';

const particlesOptions = {
  particles: {
     number:{
       value: 100,
       density:{
         enable: true,
         value_area:800
       }
     }
  }
}

const initialState = {
  input:'',
  imgurl:'',
  route:'signin',
  box:{},
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}


class App extends Component{
  constructor(){
    super()
    this.state=initialState;
  }

  loadUser = (data) =>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }
    })
  }

 
  claculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById('imageinput')
    const width = Number(image.width)
    const height = Number(image.height)
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box:box})
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () =>{
    this.setState({imgurl:this.state.input})
      fetch('http://localhost:3000/imageurl',{
        method:'post',
        headers:{'content-Type':'application/json'},
        body:JSON.stringify({
          input:this.state.input
        })
      })
      .then(response=> response.json())
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count =>{
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.claculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route ==='signout'){
      this.setState(initialState)
    }else if(route ==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }


  render(){
    return(
      <div className='App'>
      <Particles className='Particles'
        params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
          ?<div>
            <Logo/>
            <Rank name={this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imgurl={this.state.imgurl} box={this.state.box}/>
          </div>
        :( this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>

        )
    }
      </div>
    );
  }
}

export default App;
