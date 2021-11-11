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
  const [loginUser, setLoginUser] = useState({});
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header loginUser={loginUser} />
          <div className="body">
            <SideMenu />
            <Home setLoginUser={setLoginUser} login_user={loginUser} />
            {!!Object.keys(loginUser).length ? (
              <SideBar login_user={loginUser} />
            ) : null}
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
