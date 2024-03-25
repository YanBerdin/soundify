// import React from 'react';
import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useProvider } from "../utils/Provider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";

function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useProvider();

  console.log("Rendering => Body"); //TODO Remove this line

  useEffect(() => {
    const getInitialPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data); //TODO Remove this line
        console.log("getInitialPlaylist (Body.jsx)"); //TODO Remove this line
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        // console.log(response.data); //TODO Remove this line
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
        console.log("dispatch SET_PLAYLIST selectedPlaylist"); //TODO Remove this line
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error(
            "Token expiré. Cliquer sur Logout ou fermer l'onglet.",
            error
          );
          // window.location.href = "http://localhost:3000";
        } else {
          console.error("Erreur de récupération des playlists", error);
        }
      }
    };
    getInitialPlaylist();
    console.log("getInitialPlaylist (Body.jsx)"); //TODO Remove this line
  }, [token, dispatch, selectedPlaylistId]);

  // console.log(selectedPlaylistId); //TODO Remove this line
  // console.log(selectedPlaylist.name);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 204) {
        const currentPlaying = {
          id,
          name,
          artists,
          image,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        console.log("dispatch SET_PLAYING currentPlaying"); //TODO Remove this line
        console.log("dispatch SET_PLAYER_STATE playerState: true"); //TODO Remove this line
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        console.error(
          "Cette fonctionnalité nécessite un lecteur Spotify déjà ouvert sur un autre appareil.",
          error
        );
      } else {
        console.error(
          "Une erreur s'est produite lors de la lecture de la piste.",
          error
        );
      }
     // console.log(selectedPlaylist); //TODO: Remove this line
    }
  };

  // Convertir les millisecondes en minutes et secondes
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <Container>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .image img {
      height: 15rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;

      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }

  .list {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;

    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin-top: 1rem;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: background-color 0.3s ease-in-out;
      background-color: ${({ headerBackground }) => headerBackground ? '#000000dc' : 'none'};
    }

    .tracks .row {
      padding: 0.5rem 1rem;
      display: grid;
      grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }

      .col {
        display: flex;
        align-items: center;
        color: #dddcdc;

        img {
          height: 40px;
          width: 40px;
        }
      }

      .detail {
        display: flex;
        gap: 1rem;

        .info {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;

export default Body;
