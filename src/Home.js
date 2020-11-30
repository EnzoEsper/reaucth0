import React from "react";
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    // destructuring props
    const { isAuthenticated, login } = this.props.auth;
    return(
      <div>
        <h1>Home</h1>
        { isAuthenticated() ?
          <Link to="/profile">View Profile</Link>
          /* this login method is the one that is declared in Auth.js */
          : <button onClick={login}>Login</button>
        }
      </div>
    );
  }
}

export default Home;