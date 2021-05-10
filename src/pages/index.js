import React, {useState} from "react"
import styled from "styled-components"
import mazepin from "../images/mazepin.png"
import "@fontsource/krona-one"
import { mazepinThings } from "../util/mazepinThings"

const Ticket = styled.div`
display: flex;
flex-direction: column;
width: 80%;
margin: auto;
font-family: "Krona One", sans-serif;

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
justify-content: center;
font-family: "Krona One", sans-serif;`

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
font-family: "Krona One", sans-serif;
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
font-family: "Krona One", sans-serif;
font-size: 10px;` 


const IndexPage = () => {
  const [ticket, setTicket] = useState(new Array(3).fill(new Array(5).fill(null))); //initialize with null every square
  const [isChoosing, setIsChoosing] = useState(false);
  const [currentSquare, setCurrentSquare] = useState({ i: null, j: null });

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

  return (
    <>
    <Header><Title>Mazepin <br /> Bingo </Title></Header>
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

    </>
    
  )
}

export default IndexPage
