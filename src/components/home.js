import { Switch, Route, Link, useParams } from "react-router-dom";
import Recipe from "./recipe";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <Switch>
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

function RecipeScreen() {
  let { recipeId } = useParams();
  let recipe = {
    recipeId: recipeId,
    title: "title",
    discription: "discription",
    procedures: Array(10).fill(1),
    ingredients: Array(10).fill(1),
  };
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
