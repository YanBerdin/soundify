import React from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";


function Footer() {
  console.log("Rendering => Footer"); //TODO Remove this line
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 0 1rem;
`;

export default Footer;
