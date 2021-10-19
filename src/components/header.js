import logo from "../img/cookpad_icon.png";
function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" width="264" height="54" />
      <form className="search-form">
        <input
          type="text"
          name="keyword"
          id="keyword"
          className="search-box"
          placeholder="料理名・食材名"
          autocomplete="off"
        />
        <input
          type="submit"
          name="commit"
          value="レシピ検索"
          id="submit_button"
          className="search-btn"
        />
      </form>
      <img
        width="30"
        height="30"
        src="https://assets.cpcdn.com/assets/global/icon_service_menu_myfolder@2x.png?28b04d7b1ed2c6ceffd67cf6504e3367f4d533545079d5ec8ea182bc6242c01c"
        alt="folder"
      />
      <img
        className="setting"
        alt="setting"
        width="25"
        height="25"
        src="https://assets.cpcdn.com/assets/global/header_config.png?f63fccfc568cc03db8b0d45072cf9b6550df024e4ef8c36cefbcb0fa3626bc0c"
      />
    </div>
  );
}

export default Header;
