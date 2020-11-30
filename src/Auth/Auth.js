import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: "openid profile email",
    });
  }

  // class property syntax
  login = () => {
    // method aviable in the auth0 object. This will redirect the browser
    // tho the auth0 login page
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    // function that parses the hash from the url
    this.auth0.parseHash((err, authResult) => {
      // if we receive an authResult and have an acces and id token
      if (authResult && authResult.accessToken && authResult.idToken) {
        // we create the session and store some data in local storage
        this.setSession(authResult);
        // programatically redirects the app to the home page
        this.history.push("/");
      } else if (err) {
        // handling errors
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for more details`);
        console.log(err);
      }
    });
  };

  setSession = (authResult) => {
    // set the time that the acces token will expire. this gives us the Unix epoch time when the token will expire.
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

    // store some data in local storage
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  isAuthenticated() {
    // check if whether the current time is passed the acces token
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    // we undo that we set in the login
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // redirects the app to the home page
    // this.history.push("/");
    

    // this is for a non-soft logout
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000"
    })
  }
}
