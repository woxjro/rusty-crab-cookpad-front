function Recipe({ recipe }) {
  const { recipeId, title, discription, ingredients, procedures } = recipe;
  let procedures_grouped = [];
  for (let index = 0; index < procedures.length; index += 4) {
    procedures_grouped.push(procedures.slice(index, index + 4));
  }

  return (
    <div className="recipe">
      <div className="container">
        <div className="recipe-header">
          <div>{title + recipeId}</div>
        </div>
        <div className="recipe-body">
          <div className="recipe-summary">
            <div className="right">
              <div className="recipe-icon">
                <img width="300px" height="400px" />
              </div>
            </div>
            <div className="left">
              <div className="recipe-discription">{discription}</div>
              <div className="recipe-ingredients">
                材料・分量
                {
                  //ingredients list
                }
              </div>
            </div>
          </div>
          <div className="recipe-procedures">
            <p>作り方</p>
            <div className="recipe-procedures-wrapper">
              {}
              {procedures_grouped.map((row, i) => {
                return (
                  <div className="recipe-procedures-row">
                    {row.map((e, j) => {
                      return (
                        <div className="recipe-procedure">
                          <img width="150" height="200" />
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