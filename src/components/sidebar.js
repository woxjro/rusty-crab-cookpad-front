import { Link } from "react-router-dom";

function SideBar() {
  const listItems = Array(100)
    .fill(1)
    .map((number, i) => <RecipeMini src="" i={i} />);

  return (
    <div className="sidebar">
      <div className="title">最近見たレシピ</div>
      {listItems}
    </div>
  );
}

function RecipeMini({ i }) {
  console.log(i);
  return (
    <div className="recipe_li" key={i}>
      <Link to={"/recipe/" + i}>
        <div className="img"></div>
        <div className="discription"></div>
      </Link>
    </div>
  );
}

export default SideBar;
