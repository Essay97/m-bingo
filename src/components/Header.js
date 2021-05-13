import React from "react";
import mazepin from "../images/mazepin.png";
import styled from "styled-components";
import { Link } from "gatsby";

const HeaderSection = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  position: relative;
  display: inline-block;
  font-size: 50px;

  &:before {
    content: "";
    background-image: url(${mazepin});
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: -30px;
    top: 0;
    z-index: -1;
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  padding: 0;
  width: 100%;

  & li a {
    text-decoration: none;
    color: blue;
  }

  & li a:active {
    color: blue;
  }
`;

const Header = ({ links }) => {
  return (
    <HeaderSection>
      <Title>
        Mazepin <br /> Bingo
      </Title>
      <Menu>
        {
          /* If the links array is falsy (no links provided), the menu is not rendered */
          links &&
            links.map((item) => (
              <li key={item.name}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))
        }
      </Menu>
    </HeaderSection>
  );
};

export default Header;
