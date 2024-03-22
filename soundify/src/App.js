import React, { useEffect } from "react";
import Login from "./components/Login";
import { useProvider } from "./utils/Provider";
import { reducerCases } from "./utils/Constants";
import Soundify from "./components/Soundify";
import "./App.css";

function App() {
  const [{ token }, dispatch] = useProvider();
  // console.log(token);

  useEffect(() => {
    // Vérifier si un token est stocké dans sessionStorage au démarrage de l'application
    const storedToken = window.sessionStorage.getItem("token");

    // Si un token est trouvé et qu'il n'est pas déjà dans le state => MAJ du state
    if (storedToken && !token) {
      dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
    }

    // Écouter les changements dans l'URL qui peuvent indiquer un nouveau token
    const hash = window.location.hash;
    if (hash) {
      const tokenMatch = hash.match(/access_token=([^&]*)/);

      if (tokenMatch) {
        const newToken = tokenMatch[1];
        window.sessionStorage.setItem("token", newToken);

        // Nettoyer le hash de l'URL
        window.location.hash = "";
        dispatch({ type: reducerCases.SET_TOKEN, token: newToken });

        //  console.log(newToken);
        //  console.log(token);
      }
    }

    //  console.log(token);
  }, [dispatch, token]);

  return !token ? (
    <Login />
  ) : (
    <div>
      <Soundify />
    </div>
  );
}

export default App;
