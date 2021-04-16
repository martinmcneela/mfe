import React, { Fragment } from "react";
import { OLMap } from "./components/Map";
import styled from "styled-components";

const Title = styled.h1`
  text-decoration: none;
  color: red;
  font-family: cursive;
`;

const App = () => (
  <Fragment>
    <Title>
      Openlayers
    </Title>
    <OLMap />
  </Fragment>
);

export default App;
