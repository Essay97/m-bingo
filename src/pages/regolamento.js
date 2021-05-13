import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StandardLeftAlign from "../layouts/StandardLeftAlign";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  color: red;
`;

const Rules = styled.p`
  margin: 0 auto 15px auto;
`;

const BottomLine = styled.h3`
  text-align: center;
  margin: 50px;
  color: blue;
`;

const RegolamentoPage = () => {
  return (
    <StandardLeftAlign>
      <Header
        links={[
          { name: "Home", link: "/" },
          { name: "Leaderboard", link: "/leaderboard" },
        ]}
      />
      <Title>Regolamento</Title>
      <Rules>
        Questo gioco è molto simile alla tombola, con la differenza che sarai tu
        a scegliere come comporre la cartella. L'obiettivo del gioco è cercare
        di indovinare il maggior numero possibile di idiozie che il nostro
        beniamino riuscirà a fare nel prossimo weekend di Formula 1 (Nikita ti
        vogliamo bene).
      </Rules>
      <Rules>
        Nella homepage troverai una griglia di riquadri rossi, riuniti in gruppi
        di 5 tramite dei riquadri blu (i gruppi sono disposti in orizzontale se
        stai giocando da PC, in verticale se giochi da mobile). Ogni idiozia
        indovinata vale 1 punto, il tuo punteggio sarà determinato dal gruppo
        blu in cui hai totalizzato più punti. Ah, ci sono dei punti bonus se
        riesci a indovinare tutte e 15 le caselle, ma credo che in quel caso
        Nikita verrà licenziato, quindi ti auguro che non succeda mai, almeno
        possiamo continuare a giocare insieme.
      </Rules>
      <Rules>Per giocare, vai sulla home e segui questi semplici passi: </Rules>
      <ul>
        <li>
          Inserisci il tuo nome nel campo di testo. Se sei già iscritto, puoi
          recuperare la tua ultima cartella cliccando OK
        </li>
        <li>
          Scegli un'idiozia per ogni riquadro, non lasciarne in bianco (in
          rosso?)
        </li>
        <li>Quando sei pronto, clicca Invia</li>
        <li>
          Puoi modificare la tua cartella fino alla fine delle qualifiche del
          sabato (o alla fine della sprint race)
        </li>
      </ul>
      <BottomLine>DAJE NIKITA FACCI SOGNARE</BottomLine>
      <Footer />
    </StandardLeftAlign>
  );
};

export default RegolamentoPage;
