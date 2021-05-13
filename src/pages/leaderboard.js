import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CenteredColumn from "../layouts/CenteredColumn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { mazepinThings } from "../data/mazepinThings";

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
  const [tickets, setTickets] = useState([
    {
      _id: "298327966938563079",
      row1: ["sbinna", "sbinna", "sbinna", "sbinna", "sbinna"],
      row2: [
        "batte Mick",
        "batte Mick",
        "va a punti",
        "batte Mick",
        "batte Mick",
      ],
      row3: [
        "batte Mick",
        "batte Mick",
        "batte Mick",
        "batte Mick",
        "batte Mick",
      ],
      owner: {
        _id: "298327966951145991",
        name: "Enrico",
      },
      score: 3,
    },
    {
      _id: "298327966938543079",
      row1: [
        "batte Mick",
        "errore nei pit",
        "batte Mick",
        "batte Mick",
        "batte Mick",
      ],
      row2: ["sbinna", "sbinna", "va a punti", "batte Mick", "batte Mick"],
      row3: [
        "batte Mick",
        "batte Mick",
        "batte Mick",
        "batte Mick",
        "batte Mick",
      ],
      owner: {
        _id: "298327966951245991",
        name: "Marco",
      },
      score: 0,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "POST",
        url: "/api/all-tickets",
      });

      const calculatedTickets = response.data.tickets.map((item) => {
        item.score = calculateScore([item.row1, item.row2, item.row3]);
        return item;
      });
      setTickets(calculatedTickets.sort((a, b) => b.score - a.score));
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
