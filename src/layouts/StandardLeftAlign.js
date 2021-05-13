import React from "react";
import styled from "styled-components";

const Container = styled.main`
  font-family: "Krona One", sans-serif;
  width: 80%;
  margin: auto;

  @media only screen and (max-width: 720px) {
    width: 90%;
  }
`;

const StandardLeftAlign = ({ children }) => {
  return <Container>{children}</Container>;
};

export default StandardLeftAlign;
