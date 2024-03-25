import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useProvider } from "../utils/Provider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

function PlayerControls() {
  const [{ token, playerState }, dispatch] = useProvider();

  const changeState = async () => {
    try {
      const state = playerState ? "pause" : "play";
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 204) {
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: !playerState,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium."
        );
        console.log(
          "Cette fonctionnalité nécessite un compte Spotify Premium."
        ); //TODO Remove this line
      } else {
        // Gérer d'autres types d'erreurs ici
        console.error(
          "Une erreur s'est produite lors de la modification Play/Pause de l'état du lecteur."
        );
        console.log(
          "Une erreur s'est produite lors de la modification de l'état du lecteur."
        ); //TODO Remove this line
      }
    }
  };

  const changeTrack = async (type) => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

      const response1 = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response1.data); //TODO Remove this line

      if (response1.data !== "") {
        //response1.data !== ""
        const currentPlaying = {
          id: response1.data.item.id,
          name: response1.data.item.name,
          artists: response1.data.item.artists.map((artist) => artist.name),
          image: response1.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium."
        );
        console.log(
          "Cette fonctionnalité nécessite un compte Spotify Premium."
        );
      } else {
        // Gérer d'autres types d'erreurs ici
        console.error("Une erreur s'est produite lors du changement de piste."); //TODO Remove this line
        console.log("Une erreur s'est produite lors du changement de piste."); //TODO Remove this line
      }
    }
  };
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;

export default PlayerControls;
