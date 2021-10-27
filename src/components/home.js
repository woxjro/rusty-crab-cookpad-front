import { Switch, Route, Link, useParams } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <Switch>
          <Route path="/recipe/:recipeId">
            <RecipeDetail />
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

function RecipeDetail() {
  let { recipeId } = useParams();
  return (
    <div className="recipes detail">
      <div className="container">{recipeId}</div>
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
