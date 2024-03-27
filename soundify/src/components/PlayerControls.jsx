import React from "react";
// import getPlaybackState from "./Soundify";
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
// import { useEffect } from "react";

function PlayerControls() {
  const [{ token, playerState }, dispatch] = useProvider();
  console.log("Rendering => PlayerControls"); //TODO Remove this line
  console.log("playerState", playerState); //TODO Remove this line

  // Fonction pour changer l'état du lecteur (pause / lecture)
  const changeState = async () => {
    try {
      const state = playerState ? "pause" : "play";
      const response = await axios.put(
        // https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
        // https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      // OK mais empty response
      if (response.status === 204) {
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: !playerState,
        });
        console.log("dispatch SET_PLAYER_STATE, playerState: !playerState"); //TODO Remove this line
        console.log(playerState);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium. Reste sur PAUSE",
          error
        );
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium. Reste sur PAUSE",
          error
        );
      } else {
        // Gérer d'autres types d'erreurs ici
        console.error(
          "Une erreur s'est produite lors de la modification Play/Pause de l'état du lecteur.",
          error
        );
      }
    }
  };

  // Fonction pour changer de piste type = "next" ou "previous"
  const changeTrackAndGetInfo = async (type) => {
    console.log("Appel => changeTrackAndGetInfo"); //TODO Remove this line
    try {
      // Changement de piste
      const changeTrackResponse = await axios.post(
        // https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
        // https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
        //* empty response
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      // console.log(
      //   "dispatch SET_PLAYER_STATE, playerState: playerState => PAUSE"
      // ); //TODO Remove this line
      console.log("changeTrackResponse", changeTrackResponse); //TODO Remove this line

      if (changeTrackResponse.status === 204) {
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: !playerState,
        });

        // Récupérer la musique en cours de lecture
        const trackInfoResponse = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("trackInfoResponse.data", trackInfoResponse.data); //TODO Remove this line

        if (trackInfoResponse.data && trackInfoResponse.data.item) {
          // Récupération de l'état du lecteur
          const isPlaying = trackInfoResponse.data.is_playing;
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: isPlaying,
          });

          // Récupération des informations du nouveau morceau
          const currentPlaying = {
            id: trackInfoResponse.data.item.id,
            name: trackInfoResponse.data.item.name,
            artists: trackInfoResponse.data.item.artists.map(
              (artist) => artist.name
            ),
            image: trackInfoResponse.data.item.album.images[2].url,
          };

          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
          console.log("playerState", playerState); //TODO Remove this line

          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: playerState,
          });
          console.log("dispatch reducerCases.SET_PLAYING, currentPlaying"); //TODO Remove this line
          // } else {
          //   dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
             console.log("dispatch SET_PLAYER_STATE, playerState: playerState"); //TODO Remove this line
          console.log("trackInfoResponse.data", trackInfoResponse.data);
          // getPlaybackState();

          console.log("playerState", playerState); //TODO Remove this line
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Gérer l'erreur 403 ici
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium.",
          error
        );
        console.error(
          "Cette fonctionnalité nécessite un compte Spotify Premium.",
          error
        );
      } else {
        // Gérer d'autres types d'erreurs ici
        console.error(
          "Une erreur s'est produite lors du changement de piste.",
          error
        );
      }
    }
  };
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrackAndGetInfo("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrackAndGetInfo("next")} />
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
