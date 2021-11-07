import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import "./styles/style.css";
import Home from "./components/home";
import SideBar from "./components/sidebar";
import SideMenu from "./components/sidemenu";
import Header from "./components/header";

function App() {
  const [login_user, setLoginUser] = useState({});
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <div className="body">
            <SideMenu />
            <Home setLoginUser={setLoginUser} />
            <SideBar login_user={login_user} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
