import React from "react";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Krona One", sans-serif;
  align-items: center;
`;

const CenteredColumn = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CenteredColumn;
