function Home() {
  return (
    <div className="home">
      <div className="container">
        <RecipesLegend />
        <RecipesCategoryContainer />
        <RecipesTag />
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
