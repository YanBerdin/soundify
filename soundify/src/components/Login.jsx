import React from "react";
import styled from "styled-components";

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = "http://localhost:3000";
const api_uri = "https://accounts.spotify.com/authorize";
const scope = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
];
const RESPONSE_TYPE = "token";

export function Login() {
  const handleClick = async () => {
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
  };

  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify-logo"
        width="100%"
      />
      <button onClick={handleClick}>LOGIN WITH SPOTIFY</button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #1db954;
  gap: 5rem;
  img {
    object-fit: contain;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export default Login;
