import React, { useEffect } from "react";
import { useProvider } from "../utils/Provider";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function Soundify() {
  const [{ token }, dispatch] = useProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch({ type: reducerCases.SET_TOKEN, token: "" });

    // Redirect vers login page
    window.location.href = "http://localhost:3000";
  };
  // console.log(token);

  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <button onClick={logout}>Logout</button>
          <div className="body__contents">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      /* &::-webkit-scrollbar {
        color: "#b3b3b3";
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      } */
      }
    }
    .liHmcj ul::-webkit-scrollbar {
      width: 0.15rem;
      &-thumb {
        background-color: rgb(34, 34, 35);
      }
    }
    button {
      padding: 0.5rem 2rem;
      border-radius: 3rem;
      background-color: black;
      color: #49f585;
      border: none;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }
`;

export default Soundify;
