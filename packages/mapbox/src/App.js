import React, { Fragment } from "react";
import Map from "./components/Map";
import styled from "styled-components";

const Title = styled.h1`
  text-decoration: underline;
  color: dodgerblue;
  font-family: monospace;
`;

const ExternalLink = styled.a`
  color: palevioletred;
  font-family: cursive;
  :hover {
    color: #009e69;
    text-decoration: none;
  }
`;

const App = () => (
  <Fragment>
    <Title>
      Palace of Westminster (<ExternalLink href="https://en.wikipedia.org/wiki/Palace_of_Westminster" target="_blank">wiki</ExternalLink>) on mapbox:
    </Title>
    <Map />
  </Fragment>
);

export default App;
