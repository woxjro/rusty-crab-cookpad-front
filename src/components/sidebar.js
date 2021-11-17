import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { browsing_history, deleteRecipe } from "../api/Api";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
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

export function RecipeMini({ recipe, i, loginUser }) {
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
      {loginUser ? (
        <>
          <Link to={`/recipe/edit/${recipe.id}`}>
            <BiEditAlt size={30} onClick={() => {}} />
          </Link>
          <MdDelete
            size={30}
            onClick={() => {
              deleteRecipe(
                recipe.id,
                loginUser.id,
                (res) => {
                  console.log(res);
                },
                (err) => {
                  console.log(err);
                }
              );
            }}
          />
        </>
      ) : null}
    </div>
  );
}

export default SideBar;
