import React from "react";
import { Redirect, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from './Nav';
import Auth from "./Auth/Auth";
import Callback from "./Callback";
class App extends React.Component {

  constructor(props) {
    super(props);
    // This can be putted in state also. For this case is made it as an isntance variable only.
    // history will automatically be injected  into this component (on props) because in index.js we wrapped the App in BrowseRouter, and we pass to Auth so auth can 
    // intercat with react Router. Alternatively we could instantiate the auth object inside Auth.js and export the instance to enforce its usage as a Singleton.
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav auth={this.auth}/>
        <div className="body">
          {/* for passing the auth object to the home component, the solution is using a render prop instead */}
          <Route path="/" exact render={props => <Home auth={this.auth} {...props}/>} />
          <Route path="/callback" render={props => <Callback auth={this.auth} {...props}/>} />
          {/* redirect to the home page if the user isnt logged in. if the user isnt authenticated we dont want to load the profile page anyway (ternary operator)*/}
          <Route path="/profile" render={props => this.auth.isAuthenticated() ? <Profile auth={this.auth} {...props} /> : <Redirect to="/" />} />
        </div>
      </>
    );
  }
}

export default App;
