import React, { useState, useEffect } from "react";
import { recipe as getRecipe, users as getUsers } from "../api/Api";
import { Switch, Route, Link, useParams } from "react-router-dom";
import store from "../redux/store";
import Recipe from "./recipe";

function Home({ setLoginUser }) {
  return (
    <div className="home">
      <div className="container">
        <Switch>
          <Route path="/user/setting">
            <UserSettingScreen setLoginUser={setLoginUser} />
          </Route>
          <Route path="/recipe/:recipeId">
            <RecipeScreen />
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

function UserSettingScreen({ setLoginUser }) {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers(setUsers, () => {});
  }, []);
  return (
    <div className="user-setting-screen">
      <div className="container">
        <div>
          {users.map((user) => {
            return (
              <label>
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

function RecipeScreen() {
  let { recipeId } = useParams();
  let _recipe = {
    id: recipeId,
    title: "",
    discription: "",
    procedures: Array(10).fill(1),
    ingredients: Array(10).fill(1),
  };

  let [recipe, setRecipe] = useState(_recipe);
  useEffect(() => {
    getRecipe(recipeId, 1, setRecipe, () => {});
  }, [recipeId]);

  return (
    <div className="recipe-screen">
      <div className="container">
        <Recipe recipe={recipe} />
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
