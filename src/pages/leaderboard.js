import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CenteredColumn from "../layouts/CenteredColumn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { mazepinThings } from "../data/mazepinThings";
import { Link } from "gatsby";

const Leaderboard = styled.ul`
  padding: 0;
  list-style: none;
  width: 80%;
  counter-reset: list-position 0;

  & li {
    background: blue;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 12px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 34px;
    position: relative;
  }

  & li:before {
    counter-increment: list-position;
    content: counter(list-position);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c9c9c9;
    color: black;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 4px solid black;
    margin-right: 8px;
    text-align: center;
    vertical-align: middle;
    position: absolute;
    left: -15px;
  }
`;

const LeaderboardPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios({
          method: "POST",
          url: "/api/all-tickets",
        });

        const calculatedTickets = response.data.tickets.map((item) => {
          item.score = calculateScore([item.row1, item.row2, item.row3]);
          return item;
        });
        setTickets(calculatedTickets.sort((a, b) => b.score - a.score));
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  function calculateScore(ticket) {
    const points = [0, 0, 0];

    ticket.forEach((row, i) => {
      points[i] = row.reduce((pointsCount, square) => {
        const thing = mazepinThings.filter((item) => item.thing === square);
        if (thing[0].done) {
          return pointsCount + 1;
        }

        return pointsCount;
      }, 0);
    });

    return Math.max(...points);
  }

  return (
    <CenteredColumn>
      <Header links={[{ name: "Home", link: "/" }]} />
      <Leaderboard>
        {tickets.map((item) => (
          <li key={item._id}>
            <p style={{ alignSelf: "start" }}>{item.owner.name}</p>
            <p>{calculateScore([item.row1, item.row2, item.row3])}</p>
          </li>
        ))}
      </Leaderboard>
      <Footer />
    </CenteredColumn>
  );
};

export default LeaderboardPage;
