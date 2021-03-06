import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { whetherRecipeLike, likeRecipe, unlikeRecipe } from "../api/Api";
function Recipe({ recipe, loginUser }) {
  console.log(recipe);
  const { id, title, discription, ingredients, procedures, tags, categories } =
    recipe;
  let procedures_grouped = [];
  for (let index = 0; index < procedures.length; index += 4) {
    procedures_grouped.push(procedures.slice(index, index + 4));
  }

  const [love, setLove] = useState(false);
  useEffect(() => {
    whetherRecipeLike(loginUser.id, recipe.id, setLove, () => {});
  }, [loginUser.id, recipe.id]);

  const onClickLove = () => {
    if (love) {
      unlikeRecipe(
        recipe.id,
        loginUser.id,
        () => {
          setLove(!love);
        },
        () => {}
      );
    } else {
      likeRecipe(
        recipe.id,
        loginUser.id,
        () => {
          setLove(!love);
        },
        () => {}
      );
    }
  };

  return (
    <div className="recipe">
      <div className="container">
        <div className="recipe-header">
          <div className="recipe-title">{`No.${id} ${title}`}</div>
          <div>
            {love ? (
              <AiFillHeart
                size={25}
                style={{ color: "FF4646" }}
                onClick={onClickLove}
              />
            ) : (
              <AiOutlineHeart size={25} onClick={onClickLove} />
            )}
          </div>
        </div>
        <div className="recipe-body">
          <div className="recipe-summary">
            <div className="right">
              <div className="recipe-icon">
                <img
                  width="300px"
                  height="auto"
                  src={
                    recipe.thumbnail_path
                      ? require(`../image/${recipe.thumbnail_path}.png`).default
                      : require(`../image/noimage.png`).default
                  }
                  alt="icon"
                />
              </div>
            </div>
            <div className="left">
              <div className="recipe-discription">{discription}</div>
              <div className="recipe-ingredients">
                <table>
                  <tr>
                    <th>??????</th>
                    <th>??????</th>
                  </tr>
                  {ingredients.map((ingredient) => {
                    return (
                      <tr>
                        <td> {ingredient.name}</td>
                        <td> {ingredient.amount}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
          <div className="recipe-tags">
            {tags?.map((tag) => {
              return <div className="tag">{`#${tag.name}`}</div>;
            })}
          </div>
          <div className="recipe-categories">
            {categories?.map((category) => {
              return <div className="category">{`#${category.name}`}</div>;
            })}
          </div>
          <div className="recipe-procedures">
            <p>?????????</p>
            <div className="recipe-procedures-wrapper">
              {}
              {procedures_grouped.map((row, i) => {
                return (
                  <div className="recipe-procedures-row">
                    {row.map((e, j) => {
                      return (
                        <div className="recipe-procedure">
                          <img width="150" height="200" />
                          <p>{e.discription}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
