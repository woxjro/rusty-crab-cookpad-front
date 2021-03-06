import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useLocation } from "react-router-dom";
import {
  recipe as getRecipe,
  users as getUsers,
  createRecipe,
  updateRecipe,
  recipes as getRecipes,
  searchRecipes,
  likedRecipes as getLikedRecipes,
  createdRecipes as getCreatedRecipes,
  tags as getTags,
  categories as getCategories,
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

          <Route path="/recipe/edit/:recipeId">
            <RecipeEditScreen loginUser={login_user} />
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
  let [tags, setTags] = useState([]);
  let [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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

    getTags(setTags, () => {});
    getCategories(setCategories, () => {});
  }, [loginUser, refresh]);

  return (
    <div className="recipe-screen">
      <div className="container">
        <div className="new-recipe-container">
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {"?????????????????????"}
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
            placeholder="????????????"
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
            placeholder="???????????????"
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
                  placeholder="?????????"
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
                  placeholder="???"
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
            {"+ ????????????"}
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
                  placeholder="??????"
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
            {"+ ????????????"}
          </button>

          <div>
            {selectedImage && (
              <div>
                <img
                  alt="not fount"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button
                  onClick={() => {
                    console.log(URL.createObjectURL(selectedImage));
                    setSelectedImage(null);
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            <br />

            <br />
            <input
              type="file"
              name="myImage"
              accept="image/*"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>

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
            {"?????????????????????"}
          </button>
        </div>

        <div className="created-recipes-container">
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {"?????????????????????"}
          </div>
          {createdRecipes.map((recipe, i) => {
            return (
              <RecipeMini
                src=""
                i={i}
                key={`mini-recipe-${i}`}
                recipe={recipe}
                loginUser={loginUser}
              />
            );
          })}
        </div>

        <div className="liked-recipes-container">
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {"????????????????????????"}
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
          {"??????"}
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

function RecipeEditScreen({ loginUser }) {
  let { recipeId } = useParams();
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
  let [refresh, setRefresh] = useState(0);
  let [tags, setTags] = useState([]);
  let [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    getRecipe(
      recipeId,
      loginUser.id,
      (recipe) => {
        delete recipe.created_at;
        delete recipe.updated_at;
        recipe.tags = recipe.tags.slice().map((tag) => {
          return tag.id;
        });
        recipe.categories = recipe.categories.slice().map((category) => {
          return category.id;
        });
        console.log(recipe);
        setNewRecipe(recipe);
      },
      () => {}
    );
  }, [loginUser, refresh]);

  return (
    <div className="recipe-screen">
      <div className="container">
        <div className="new-recipe-container">
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {"???????????????"}
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
            placeholder="????????????"
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
            placeholder="???????????????"
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
                  placeholder="?????????"
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
                  placeholder="???"
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
            {"+ ????????????"}
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
                  placeholder="??????"
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
            {"+ ????????????"}
          </button>

          <div>
            {selectedImage && (
              <div>
                <img
                  alt="not fount"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button
                  onClick={() => {
                    console.log(URL.createObjectURL(selectedImage));
                    setSelectedImage(null);
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            <br />

            <br />
            <input
              type="file"
              name="myImage"
              accept="image/*"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>

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
                console.log("[updateRecipe]:", nextNewRecipe);
                updateRecipe(
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
            {"?????????????????????"}
          </button>
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
  console.log(users);
  return (
    <div className="user-setting-screen">
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {users.map((user, idx) => {
            return (
              <div key={`user-${idx}`} style={{ marginBottom: "20px" }}>
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {user.user_type_with_authorities.authorities.map(
                    (authority) => {
                      return (
                        <div
                          style={{
                            marginRight: "10px",
                            backgroundColor: "#c7f9cc",
                            padding: "5px",
                            borderRadius: "15px",
                            marginBottom: "5px",
                          }}
                        >
                          {"???" + authority.name}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
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
