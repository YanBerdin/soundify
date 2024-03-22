import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useProvider } from "../utils/Provider";

function Playlists() {
  // Récupération de l'état des playlists
  const [{ token, playlists }, dispatch] = useProvider();

  // Etat local pour le chargement
  const [loading, setLoading] = React.useState(true);

  // Appel à l'API Spotify pour récupérer les playlists
  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response.data.items);//TODO Remove this line

        // Récupérer un tableau d'objets items
        const { items } = response.data;
        console.log(items); //TODO: Remove this line 
        //? Pour accéder au nom de la première playlist
        const playlistName = items[0].name;
        console.log(playlistName); //TODO: Remove this line 
        console.log(items); //TODO: Remove this line 

        // Création d'un tableau avec les noms et les id des playlists
        const playlistData = items.map(({ name, id }) => {
          return { name, id };
        });

        // Mise à jour de l'état des playlists
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: playlistData });

        // setPlaylists(playlistData); // Mise à jour de l'état des playlists
        setLoading(false); // Mise à jour de l'état de chargement
      } catch (error) {
        console.error(error);
        // Mise à jour de l'état de chargement même en cas d'erreur
        setLoading(false);
      }
    };

    if (token) {
      getPlaylistData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  return (
    <Container>
      <div>
        <ul>
          {loading ? (
            <div>loading...</div>
          ) : (
            playlists.map(({ name, id }) => {
              return (
                <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                  {name}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;

export default Playlists;
