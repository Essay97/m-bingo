import React, {useState} from "react"
import styled from "styled-components"
import mazepin from "../images/mazepin.png"
import "@fontsource/krona-one"
import { mazepinThings } from "../data/mazepinThings"
import axios from "axios"

const Layout = styled.main`
display: flex;
flex-direction: column;
justify-content: center;
font-family: "Krona One", sans-serif;
align-items: center;`

const Ticket = styled.div`
display: flex;
flex-direction: column;
width: 80%;
margin: auto;

@media only screen and (max-width: 720px) {
  flex-direction: row;
  width: 100%
}`

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
`

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
}`

const Header = styled.header`
display: flex;
justify-content: center;`

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
}`

const Overlay = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: 0;
backdrop-filter: blur(12px);`

const Chooser = styled.ul`
list-style: none;
background: blue;
border-radius: 12px;
padding: 24px;
height: 85%;
overflow: auto;`

const Item = styled.li`
padding: 12px;
border-radius: 12px;
background: #c9c9c9;
margin: 8px 0;
font-size: 12px`

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
}`

const Attribution = styled.p`
text-align: center;
font-size: 10px;` 

const UserInput = styled.div`
display: flex;
justify-content: center;
margin: 30px;
position: relative;
align-self: stretch;`

const Input = styled.input`
width: 40%;
max-width: 600px;
font-size: 30px;`

const Button = styled.button`
background: blue;
border-radius: 8px;
border: none;
padding: 30px;
font-size: 30px;
margin-left: 18px;
color: white;`

const Alert = styled.p`
color: red;
text-align: center;
font-size: 15px;`


const IndexPage = () => {
  const [ticket, setTicket] = useState(new Array(3).fill(new Array(5).fill(null))); //initialize with null every square
  const [isChoosing, setIsChoosing] = useState(false);
  const [currentSquare, setCurrentSquare] = useState({ i: null, j: null });
  const [user, setUser] = useState("");
  const [registered, setRegistered] = useState(false);

  function computeSquare(item) {
    return ticket.map((row, rowIndex) => {
      return row.map((square, squareIndex) => {
        if(currentSquare.i === rowIndex && currentSquare.j === squareIndex) {
          return item; 
        } else {
          return square;
        }
      })
    })
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
    const response = await axios({
      method: "POST",
      url: "/api/user-by-name",
      data: {
        name: user
      }
    });

    console.log(response.data);
    if(response.data.user !== null) {
      setRegistered(true);
      const { row1, row2, row3 } = response.data.user.ticket;
      setTicket([row1, row2, row3]);
    } else {
      setRegistered(false);
    }
  }

  async function handleSubmit() {
    if(user !== "" ) {
      if(!registered) {
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
              row3: ticket[2]
            }
          });
        } catch (error) {
          alert("Qualcosa non funziona, probabilmente questo nome è già stato scelto")
        } 
      } else {
        // CASE: the user is registered
        //TODO update user
      }
    } else {
      alert("Immetti un nome utente per giocare!");
    }
  }

  return (
    <Layout>
      <Header>
        <Title>Mazepin <br /> Bingo </Title>
      </Header>
      <UserInput>
        <Input type="text" onChange={handleInput} value={user} placeholder="Chi sei?" />
        <Button onClick={handleClickInput} >OK</Button>
      </UserInput>
      {!registered && <Alert>Non sei ancora registrato. Gioca e premi "Invia"!</Alert>}
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
                    return <Square onClick={() => updateSquare(i, j)} key={`sq${i}${j}`}>{square}</Square>
                  })
                }
              </Row>
            )
          })
        }
      </Ticket>
      <Button style={{ marginTop: 20 }} onClick={handleSubmit} >Invia</Button>
      {/* Choose Item overlay */
      isChoosing && <Overlay>
        <Chooser>
          {
            mazepinThings.map(item => <Item key={item} onClick={() => selectItem(item)}>{item}</Item>)
          }
        </Chooser>
        <Close onClick={() => setIsChoosing(false) } />
      </Overlay>
      }
      <Attribution>Coded with irony by Enrico Saggiorato</Attribution>
    </Layout>
    
  )
}

export default IndexPage
