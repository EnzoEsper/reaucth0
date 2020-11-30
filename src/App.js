import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from './Nav';
import Auth from "./Auth/Auth";
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
        <Nav />
        <div className="body">
          {/* for passing the auth object to the home component, the solution is using a render prop instead */}
          <Route path="/" exact render={props => <Home auth={this.auth} {...props}/>} />
          <Route path="/profile" component={Profile} />
        </div>
      </>
    );
  }
}

export default App;
