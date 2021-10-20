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

function RecipeMini(i, src) {
  return (
    <div className="recipe_li" key={i}>
      <div className="img"></div>
      <div className="discription"></div>
    </div>
  );
}

export default SideBar;
