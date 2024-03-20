import React from "react";
import { useProvider } from "../utils/Provider";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";

function Soundify() {
  const [, dispatch] = useProvider();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch({ type: reducerCases.SET_TOKEN, token: "" });

    // Redirect vers login page
    window.location.href = "http://localhost:3000";
  };
  // console.log(token);

  return (
    <Container>
      <div>
        <h1>Welcome to Soundify</h1>
        <p>Enjoy your favorite music!</p>
        <button onClick={logout}>Logout</button>
      </div>
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
  /* background-color: #1db954; */
  gap: 5rem;

  button {
    padding: 0.5rem 3rem;
    border-radius: 3rem;
    background-color: black; 
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export default Soundify;
