import { useState } from "react";
import logo from "../img/cookpad_icon.png";
import { Link } from "react-router-dom";
import { searchRecipes } from "../api/Api";
function Header() {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src={logo} alt="logo" width="264" height="54" />
      </Link>
      <SearchBox />
      <img
        width="30"
        height="30"
        src="https://assets.cpcdn.com/assets/global/icon_service_menu_myfolder@2x.png?28b04d7b1ed2c6ceffd67cf6504e3367f4d533545079d5ec8ea182bc6242c01c"
        alt="folder"
      />
      <Link to={"/user/setting"}>
        <img
          className="setting"
          alt="setting"
          width="25"
          height="25"
          src="https://assets.cpcdn.com/assets/global/header_config.png?f63fccfc568cc03db8b0d45072cf9b6550df024e4ef8c36cefbcb0fa3626bc0c"
        />
      </Link>
    </div>
  );
}

function SearchBox() {
  const [searchWord, setSearchWord] = useState("");
  return (
    <form className="search-form" action="/recipes/search" onSubmit={() => {}}>
      <input
        type="text"
        name="words"
        id="words"
        value={searchWord}
        onChange={(e) => {
          let words = e.target.value.replace("　", " ");
          setSearchWord(words);
        }}
        className="search-box"
        placeholder="料理名・食材名"
        autocomplete="off"
      />
      <Link to={`/recipes/search/?words=${searchWord}`}>
        <button type="button" className="search-btn" id="submit_button">
          レシピ検索
        </button>
      </Link>
    </form>
  );
}

export default Header;
