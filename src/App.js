import LoggedIn from "./LoggedIn";
import React from "react";
import logo from "./logo.svg";
import slogan from "./slogan.svg";
import box from "./box.svg";
import "./App.css";
import { Grommet, Box, Button, Image, Text, ResponsiveContext } from "grommet";
import Img from "react-image";

import Parse from "parse";

Parse.initialize(
  "HhDqIDTUprMvZybtYHTQOvNrjLiQT564lI7bS77Q",
  "v9wgaJip47nGF7Tei1rAp5vFndX4I5L7DQTQ7SVb"
);
Parse.serverURL =
  "https://pg-app-dj9xy177hoalfp5edd2fe1zed7uspl.scalabl.cloud/1/";

const myTheme = {
  global: {
    breakpoints: {
      "small": {
        "value": 100,
        "borderSize": {
          "xsmall": "1px",
          "small": "2px",
          "medium": "4px",
          "large": "6px",
          "xlarge": "12px"
        },
        "edgeSize": {
          "none": "0px",
          "hair": "1px",
          "xxsmall": "2px",
          "xsmall": "3px",
          "small": "6px",
          "medium": "12px",
          "large": "24px",
          "xlarge": "48px"
        },
        "size": {
          "xxsmall": "24px",
          "xsmall": "48px",
          "small": "96px",
          "medium": "192px",
          "large": "384px",
          "xlarge": "768px",
          "full": "100%"
        }
      },
      "medium": {"value": 1536},
      "large": {}
    }
  }
};
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: Parse.User.current(),
      loading: false
    };
    window.fbAsyncInit = () => {
      console.log("pre");
      Parse.FacebookUtils.init({
        appId: "2441755599420116", // Facebook App ID
        status: true, // check Facebook Login status
        cookie: true, // enable cookies to allow Parse to access the session
        xfbml: true, // initialize Facebook social plugins on the page
        version: "v5.0" // point to the latest Facebook Graph API version
      });
      // Run code after the Facebook SDK is loaded.
      // ...
      console.log("post");
      this.setState({
        loading: true
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

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
    const imgX = {
      style: {
        width: "100%"
        // height: "100%"
      }
    };
    const content = this.state.user ? (
      <LoggedIn />
    ) : (
      <>
        <Box pad="large">
          <img {...imgX} src={slogan} />
        </Box>
        <Box
          margin={{
            vertical: "medium"
          }}
          onClick={this.login}
        >
          {this.state.loading ? (
            <ResponsiveContext>
              {size => (
                <Box pad="medium">
                  <img {...imgX} src={box} />
                </Box>
              )}
            </ResponsiveContext>
          ) : (
            <Box>loading...</Box>
          )}
        </Box>
      </>
    );
    return (
      <Grommet full theme={myTheme}>
        <Box fill={true} background="black" align="center">
          <Box
            style={{
              maxWidth: "400px"
            }}
          >
            <Box pad="medium">
              <img {...imgX} src={logo} />
            </Box>
            {content}
            <Box pad="large">
              {" "}
              <Text textAlign="center">124 people registered</Text>
            </Box>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default App;
