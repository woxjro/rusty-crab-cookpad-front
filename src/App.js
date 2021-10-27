import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles/style.css";
import Home from "./components/home";
import SideBar from "./components/sidebar";
import SideMenu from "./components/sidemenu";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="body">
          <SideMenu />
          <Home />
          <SideBar />
        </div>
      </div>
    </Router>
  );
}

export default App;
