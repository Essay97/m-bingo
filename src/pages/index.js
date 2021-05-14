import React, { useState } from "react";
import styled from "styled-components";
import "@fontsource/krona-one";
import { mazepinThings } from "../data/mazepinThings";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CenteredColumn from "../layouts/CenteredColumn";

const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;

  @media only screen and (max-width: 720px) {
    flex-direction: row;
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border: 8px solid blue;
  width: 100%;
  margin: 4px 0;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
    margin: 0 2px;
    border: 3px solid blue;
  }
`;

const Square = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  background: red;
  height: 160px;
  text-align: center;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 720px) {
    flex-basis: auto;
  }a
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(12px);
`;

const Chooser = styled.ul`
  list-style: none;
  background: blue;
  border-radius: 12px;
  padding: 24px;
  height: 85%;
  overflow: auto;
`;

const Item = styled.li`
  padding: 12px;
  border-radius: 12px;
  background: #c9c9c9;
  margin: 8px 0;
  font-size: 12px;
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 40px;
  width: 40px;

  &:before,
  &:after {
    content: "";
    width: 100%;
    height: 8px;
    background: black;
    display: block;
    transform: rotate(45deg);
    position: absolute;
    top: 0;
    left: 0;
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const UserInput = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
  position: relative;
  align-self: stretch;

  @media only screen and (max-width: 720px) {
    margin: 30px 5px;
  }
`;

const Input = styled.input`
  width: 40%;
  max-width: 600px;
  font-size: 30px;

  @media only screen and (max-width: 720px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background: blue;
  border-radius: 8px;
  border: none;
  padding: 30px;
  font-size: 30px;
  margin-left: 18px;
  color: white;
`;

const Alert = styled.p`
  color: red;
  text-align: center;
  font-size: 15px;
`;

const IndexPage = () => {
  const [isChoosing, setIsChoosing] = useState(false);
  const [currentSquare, setCurrentSquare] = useState({ i: null, j: null });
  const [user, setUser] = useState("");
  const [ticket, setTicket] = useState(
    new Array(3).fill(new Array(5).fill(null))
  ); //initialize with null every square
  const [ticketId, setTicketId] = useState(null);
  const [registered, setRegistered] = useState(false);

  function computeSquare(item) {
    return ticket.map((row, rowIndex) => {
      return row.map((square, squareIndex) => {
        if (currentSquare.i === rowIndex && currentSquare.j === squareIndex) {
          return item;
        } else {
          return square;
        }
      });
    });
  }

  function updateSquare(i, j) {
    setIsChoosing(true);
    setCurrentSquare({ i: i, j: j });
  }

  function selectItem(item) {
    setIsChoosing(false);
    const updatedTicket = computeSquare(item);
    setTicket(updatedTicket);
  }

  function handleInput(event) {
    setUser(event.target.value);
  }

  async function handleClickInput() {
    let response = null;
    try {
      response = await axios({
        method: "POST",
        url: "/api/user-by-name",
        data: {
          name: user,
        },
      });

      if (response.data.user !== null) {
        setRegistered(true);
        const { row1, row2, row3 } = response.data.user.ticket;
        setTicket([row1, row2, row3]);
        setTicketId(response.data.ticket._id);
      } else {
        setRegistered(false);
        alert(
          "Non sei ancora registrato. Benvenuto! Gioca e clicca su Invia quando sei pronto"
        );
      }
    } catch (error) {
      console.log(error.response.data);
      setRegistered(false);
      alert("Qualcosa è andato storto, riprova più tardi!");
    }
  }

  async function handleSubmit() {
    if (user !== "" && !checkTicketEmpty()) {
      if (!registered) {
        // CASE: the user is not registered
        // catching response just in case user id is needed
        try {
          const response = await axios({
            method: "POST",
            url: "/api/create-user",
            data: {
              name: user,
              row1: ticket[0],
              row2: ticket[1],
              row3: ticket[2],
            },
          });
          setRegistered(true);
          setTicketId(response.data.ticketId);
          alert("La tua giocata è stata registrata!");
        } catch (error) {
          console.log(error.response.data);

          if (
            error.response.data[0].extensions.code === "instance not unique"
          ) {
            alert(
              "Questo nome è già stato scelto! Se questo è il tuo username, clicca il tasto OK di fianco al tuo nome prima di inviare, poi reinvia la tua giocata"
            );
          } else {
            alert("Qualcosa non funziona, riprova più tardi!");
          }

          return;
        }
      } else {
        // CASE: the user is registered
        try {
          await axios({
            method: "POST",
            url: "/api/update-ticket",
            data: {
              row1: ticket[0],
              row2: ticket[1],
              row3: ticket[2],
              id: ticketId,
            },
          });
          alert("La tua giocata è stata registrata!");
        } catch (error) {
          alert("Qualcosa è andato storto, prova a reinviare!");
        }
      }
    } else {
      alert("Immetti un nome utente e completa tutte le caselle per giocare!");
    }
  }

  function checkTicketEmpty() {
    const ticketEmpty = ticket.some((row) => row.some((square) => !square));
    console.log(ticketEmpty);
    return ticketEmpty;
  }

  return (
    <CenteredColumn>
      <Header
        links={[
          { name: "Leaderboard", link: "/leaderboard" },
          { name: "Regolamento", link: "/regolamento" },
        ]}
      />
      <UserInput>
        <Input
          type="text"
          onChange={handleInput}
          value={user}
          placeholder="Chi sei?"
        />
        <Button onClick={handleClickInput}>OK</Button>
      </UserInput>
      {!registered && (
        <Alert>Non sei ancora registrato. Gioca e premi "Invia"!</Alert>
      )}
      <Ticket>
        {
          //render the ticket by iterating over the state
          //iterate over the rows
          ticket.map((row, i) => {
            return (
              <Row key={`row${i}`}>
                {
                  //for every row, iterate over the squares
                  row.map((square, j) => {
                    return (
                      <Square
                        onClick={() => updateSquare(i, j)}
                        key={`sq${i}${j}`}
                      >
                        {square}
                      </Square>
                    );
                  })
                }
              </Row>
            );
          })
        }
      </Ticket>
      <Button style={{ marginTop: 20 }} onClick={handleSubmit}>
        Invia
      </Button>
      {
        /* Choose Item overlay */
        isChoosing && (
          <Overlay>
            <Chooser>
              {mazepinThings.map((item) => (
                <Item key={item.thing} onClick={() => selectItem(item.thing)}>
                  {item.thing}
                </Item>
              ))}
            </Chooser>
            <Close onClick={() => setIsChoosing(false)} />
          </Overlay>
        )
      }
      <Footer />
    </CenteredColumn>
  );
};

export default IndexPage;
