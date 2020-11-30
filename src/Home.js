import React from "react";

class Home extends React.Component {
  render() {
    return(
      <div>
        <h1>Home</h1>
        <button onClick={this.props.auth.login}>Login</button>
      </div>
    );
  }
}

export default Home;