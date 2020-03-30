import React, {useState} from "react";
import ReactDOM from "react-dom";
import Router from "route-lite";
import "semantic-ui-css/semantic.min.css";
import './index.css';

import Auth from "./components/Auth";


function App() {

  const [user, setUser] = useState(null);

  function Login() {
    setUser({
      name: "Gareth"
    })
  }

  return (
      <Router>
        <Auth 
          user={user}
          setUser ={setUser}
        />
      </Router>
  );
}

export default App;
