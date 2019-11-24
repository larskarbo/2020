import React, { Component } from "react";

import { Grommet, Box, Button, Image, Text } from "grommet";
import { FacebookIcon, TwitterIcon } from "react-share";

const LoggedIn = () => {
  return (
    <Box>
      <Text>You are logged in</Text>
      <Text>Share this page with your friends!</Text>
      <Text>You will get an email when we are getting closer</Text>
    </Box>
  );
};

export default LoggedIn;
