import React, { useState, useEffect } from "react";
import { recipe as getRecipe, users as getUsers } from "../api/Api";
import { Switch, Route, Link, useParams, useLocation } from "react-router-dom";
import {
  createRecipe,
  recipes as getRecipes,
  searchRecipes,
  likedRecipes as getLikedRecipes,
  createdRecipes as getCreatedRecipes,
} from "../api/Api";
import store from "../redux/store";
import Recipe from "./recipe";
import { RecipeMini } from "./sidebar";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Home({ login_user, setLoginUser }) {
  return (
    <div className="home">
      <div className="container">
        <Switch>
          <Route path="/recipes/search">
            <SearchedRecipesScreen />
          </Route>
          <Route path="/services/normal/recipes">
            <RecipesScreen />
          </Route>
          <Route path="/user/setting">
            <UserSettingScreen setLoginUser={setLoginUser} />
          </Route>
          <Route path="/user/create_recipe">
            <CreateRecipeScreen loginUser={login_user} />
          </Route>

          <Route path="/recipe/:recipeId">
            <RecipeScreen login_user={login_user} />
          </Route>
          <Route path="/">
            <RecipesLegend />
            <RecipesCategoryContainer />
            <RecipesTag />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function CreateRecipeScreen({ loginUser }) {
  let _ingredient = {
    name: "",
    amount: "",
  };
  let _procedure = {
    number: null,
    discription: "",
    image_path: null,
  };
  let _newRecipe = {
    user_id: loginUser.id,
    title: "",
    thumbnail_path: null,
    discription: "",
    ingredients: [_ingredient],
    procedures: [_procedure],
    tags: [],
    categories: [],
  };

  let [newRecipe, setNewRecipe] = useState(_newRecipe);
  let [createdRecipes, setCreatedRecipes] = useState([]);
  let [likedRecipes, setLikedRecipes] = useState([]);
  let [refresh, setRefresh] = useState(0);
  useEffect(() => {
    console.log("called");
    getLikedRecipes(
      loginUser.id,
      (data) => {
        setLikedRecipes(data);
      },
      () => {}
    );
    getCreatedRecipes(
      loginUser.id,
      null,
      null,
      (data) => {
        console.log(data);
        setCreatedRecipes(data);
      },
      () => {}
    );
  }, [loginUser, refresh]);

  return (
    <div className="recipe-screen">
      <div className="container">
        <div className="new-recipe-container">
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {"新規レシピ作成"}
          </div>
          <input
            type="text"
            name="title"
            id="title"
            value={newRecipe.title}
            onChange={(e) => {
              let title = e.target.value;
              setNewRecipe({ ...newRecipe, title });
            }}
            className="new-recipe-box"
            placeholder="タイトル"
            autocomplete="off"
          />
          <input
            type="text"
            name="discription"
            id="discription"
            value={newRecipe.discription}
            onChange={(e) => {
              let discription = e.target.value;
              setNewRecipe({ ...newRecipe, discription });
            }}
            className="new-recipe-box"
            placeholder="レシピ説明"
            autocomplete="off"
          />
          {newRecipe.ingredients.map((ingrediient, i) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>{i + 1}</div>
                <input
                  type="text"
                  name={`ingredient-name-${i}`}
                  id={`ingredient-name-${i}`}
                  value={ingrediient.name}
                  onChange={(e) => {
                    let name = e.target.value;
                    let ingredients = newRecipe.ingredients.slice();
                    ingredients[i].name = name;
                    setNewRecipe({ ...newRecipe, ingredients });
                  }}
                  className="new-recipe-box"
                  placeholder="材料名"
                  autocomplete="off"
                />
                <input
                  type="text"
                  name={`ingredient-amount-${i}`}
                  id={`ingredient-amount-${i}`}
                  value={ingrediient.amount}
                  onChange={(e) => {
                    let amount = e.target.value;
                    let ingredients = newRecipe.ingredients.slice();
                    ingredients[i].amount = amount;
                    setNewRecipe({ ...newRecipe, ingredients });
                  }}
                  className="new-recipe-box"
                  placeholder="量"
                  autocomplete="off"
                />
              </div>
            );
          })}

          <button
            onClick={() => {
              let ingredients = newRecipe.ingredients.slice();
              ingredients.push(_ingredient);
              setNewRecipe({ ...newRecipe, ingredients });
            }}
          >
            {"+ 材料・量"}
          </button>

          {newRecipe.procedures.map((procedure, i) => {
            //set number
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>{i + 1}</div>
                <input
                  type="text"
                  name={`procedure-discription-${i}`}
                  id={`procedure-discription-${i}`}
                  value={procedure.discription}
                  onChange={(e) => {
                    let discription = e.target.value;
                    let procedures = newRecipe.procedures.slice();
                    procedures[i].discription = discription;
                    setNewRecipe({ ...newRecipe, procedures });
                  }}
                  className="new-recipe-box"
                  placeholder="説明"
                  autocomplete="off"
                />
              </div>
            );
          })}

          <button
            onClick={() => {
              let procedures = newRecipe.procedures.slice();
              procedures.push(_procedure);
              setNewRecipe({ ...newRecipe, procedures });
            }}
          >
            {"+ 手順手順"}
          </button>

          <button
            onClick={() => {
              let ingredients = newRecipe.ingredients
                .slice()
                .filter((ingredient) => {
                  return !!ingredient.amount && !!ingredient.name;
                });
              let procedures = newRecipe.procedures
                .slice()
                .filter((procedure) => {
                  return !!procedure.discription;
                })
                .map((procedure, i) => {
                  return { number: i + 1, discription: procedure.discription };
                });
              let nextNewRecipe = { ...newRecipe };
              nextNewRecipe.procedures = procedures;
              nextNewRecipe.ingredients = ingredients;

              if (nextNewRecipe.title && nextNewRecipe.discription) {
                createRecipe(
                  nextNewRecipe,
                  () => {
                    setNewRecipe(nextNewRecipe);
                    setRefresh(refresh + 1);
                  },
                  () => {}
                );
              }
            }}
          >
            {"レシピ作成完了"}
          </button>
        </div>

        <div className="created-recipes-container">
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {"作成したレシピ"}
          </div>
          {createdRecipes.map((recipe, i) => {
            return (
              <RecipeMini
                src=""
                i={i}
                key={`mini-recipe-${i}`}
                recipe={recipe}
              />
            );
          })}
        </div>

        <div className="liked-recipes-container">
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {"いいねしたレシピ"}
          </div>
          {likedRecipes.map((recipe, i) => {
            return (
              <RecipeMini
                src=""
                i={i}
                key={`mini-recipe-${i}`}
                recipe={recipe}
              />
            );
          })}
        </div>

        <button
          onClick={() => {
            setRefresh(refresh + 1);
          }}
        >
          {"更新"}
        </button>
      </div>
    </div>
  );
}

function RecipesScreen() {
  let [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes(setRecipes, () => {});
  }, []);

  return (
    <div className="recipe-screen">
      <div className="container">
        <div>
          {recipes.map((recipe) => {
            return (
              <Link to={`/recipe/${recipe.id}`}>
                <li> {recipe.title} </li>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SearchedRecipesScreen() {
  const query = useQuery();
  const words = query.get("words");
  console.log(words);
  let [recipes, setRecipes] = useState([]);
  useEffect(() => {
    searchRecipes(words, setRecipes, () => {});
  }, [words]);

  return (
    <div className="recipe-screen">
      <div className="container">
        <div>
          {recipes.map((recipe) => {
            return (
              <Link to={`/recipe/${recipe.id}`}>
                <li> {recipe.title} </li>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function UserSettingScreen({ setLoginUser }) {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers(setUsers, () => {});
  }, []);
  return (
    <div className="user-setting-screen">
      <div className="container">
        <div>
          {users.map((user, idx) => {
            return (
              <label key={`user-${idx}`}>
                <input
                  type="radio"
                  name="users"
                  value={user.id}
                  onChange={(_) => {
                    setLoginUser(user);
                    store.dispatch({ type: "login_user", payload: user });
                  }}
                />
                {user.name}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecipeScreen({ login_user }) {
  let { recipeId } = useParams();
  let _recipe = {
    id: recipeId,
    title: "",
    discription: "",
    procedures: Array(10).fill(1),
    ingredients: Array(10).fill(1),
  };

  const [recipe, setRecipe] = useState(_recipe);
  useEffect(() => {
    console.log("called");
    getRecipe(recipeId, login_user.id, setRecipe, () => {});
  }, [login_user, recipeId]);

  return (
    <div className="recipe-screen">
      <div className="container">
        <Recipe recipe={recipe} loginUser={login_user} />
      </div>
    </div>
  );
}

function RecipesLegend() {
  return (
    <div className="recipes legend">
      <div className="container"></div>
    </div>
  );
}

function RecipesTag() {
  return (
    <div className="recipes tag">
      <div className="container"></div>
    </div>
  );
}

function RecipesCategoryContainer() {
  return (
    <div className="recipes category">
      <div className="container"></div>
    </div>
  );
}

export default Home;
