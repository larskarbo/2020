import React from "react";
import logo from "./logo.svg";
import slogan from "./slogan.svg";
import box from "./box.svg";
import "./App.css";
import { Grommet, Box, Button, Image, Text } from "grommet";
import Img from "react-image";

import Parse from "parse";

Parse.initialize(
  "HhDqIDTUprMvZybtYHTQOvNrjLiQT564lI7bS77Q",
  "v9wgaJip47nGF7Tei1rAp5vFndX4I5L7DQTQ7SVb"
);
Parse.serverURL =
  "https://pg-app-dj9xy177hoalfp5edd2fe1zed7uspl.scalabl.cloud/1/";

const myTheme = {
  global: {}
};
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: Parse.User.current(),
      loading: false
    };
    window.fbAsyncInit = () => {
      Parse.FacebookUtils.init({
        appId: "2441755599420116", // Facebook App ID
        status: true, // check Facebook Login status
        cookie: true, // enable cookies to allow Parse to access the session
        xfbml: true, // initialize Facebook social plugins on the page
        version: "v2.3" // point to the latest Facebook Graph API version
      });
      // Run code after the Facebook SDK is loaded.
      // ...
      this.setState({
        loading: true
      });
    };

    console.log("this.state.user: ", this.state.user);
  }

  link = () => {
    console.log("hey");
    window.FB.api(
      "/2463164707072009?fields=email",
      {
        access_token: this.state.user.attributes.authData.facebook.access_token
      },
      response => {
        console.log("response: ", response);
        console.log("response.error: ", response.error);
        if (response && !response.error) {
          /* handle the result */

          this.state.user.set("email", response.email);
          this.state.user.save();
        }
      }
    );
  };

  login = async () => {
    try {
      const user = await Parse.FacebookUtils.logIn("email");
      // console.log('user: ', user.getEmail());
      this.setState(
        {
          user
        },
        () => {
          if (!user.existed()) {
            console.log("User signed up and logged in through Facebook!");
            this.link();
          } else {
            console.log("User logged in through Facebook!");
          }
        }
      );
    } catch (error) {
      console.log("error: ", error);
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  };

  render() {
    return (
      <Grommet full theme={myTheme}>
        <Box fill={true} background="black" align="center">
          <Box
            style={{
              maxWidth: "400px"
            }}
          >
            <img src={logo} />
            <Box pad="large">
              <img src={slogan} />
            </Box>
            <Box
              margin={{
                vertical: "medium"
              }}
              onClick={this.login}
            >
              { this.state.loading ?
              <img
                style={{
                  width: "100%"
                }}
                src={box}
              />
              : <Box>loading...</Box> }
            </Box>
          </Box>

          <Box pad="large">124 people registered</Box>
        </Box>
      </Grommet>
    );
  }
}

export default App;
