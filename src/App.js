import "./styles/style.css";
import Home from "./components/home";
import SideBar from "./components/sidebar";
import Header from "./components/header";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Home />
        <SideBar />
      </div>
    </div>
  );
}

export default App;
