import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { browsing_history } from "../api/Api";
function SideBar({ login_user }) {
  let [recipes, setRecipes] = useState([]);
  useEffect(() => {
    if (!!login_user) {
      console.log(login_user);
      browsing_history(login_user.id, setRecipes, () => {});
    }
  }, [login_user]);

  const listItems = recipes.map((recipe, i) => (
    <RecipeMini src="" i={i} key={`mini-recipe-${i}`} recipe={recipe} />
  ));

  return (
    <div className="sidebar">
      <div className="title">最近見たレシピ</div>
      {listItems}
    </div>
  );
}

export function RecipeMini({ recipe, i }) {
  return (
    <div className="recipe_li" key={i}>
      <Link to={`/recipe/${recipe.id}`}>
        <div className="img">
          <img
            width="70px"
            height="70px"
            src={
              recipe.thumbnail_path
                ? require(`../image/${recipe.thumbnail_path}.png`).default
                : require(`../image/noimage.png`).default
            }
            alt="mini-icon"
          />
        </div>
        <div className="discription">{recipe.title}</div>
      </Link>
    </div>
  );
}

export default SideBar;
