import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useProvider } from "./utils/Provider";
import { reducerCases } from "./utils/Constants";

function App() {

    const [{ token }, dispatch] = useProvider();

    useEffect(() => {
      const hash = window.location.hash;
      console.log(hash);
      if (hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1];
        console.log(token);
        if (token) {
          dispatch({ type: reducerCases.SET_TOKEN, token });
        }
      }

    }, [dispatch, token]);

    return <div>{token ? <Spotify /> : <Login />}</div>
}

export default App;
