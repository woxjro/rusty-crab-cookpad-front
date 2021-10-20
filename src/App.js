import "./styles/style.css";
import Home from "./components/home";
import SideBar from "./components/sidebar";
import SideMenu from "./components/sidemenu";
import Header from "./components/header";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <SideMenu />
        <Home />
        <SideBar />
      </div>
    </div>
  );
}

export default App;
