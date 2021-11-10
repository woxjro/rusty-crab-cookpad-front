const API_URL = "http://127.0.0.1:8000/api";

export const recipe = (recipe_id, user_id, successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe/${recipe_id}/by/${user_id}`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const recipes = (successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const browsing_history = (user_id, successFunc, failedFunc) => {
  fetch(`${API_URL}/user/browsed_recipes/${user_id}`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const users = (successFunc, failedFunc) => {
  fetch(`${API_URL}/user/`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const searchRecipes = (words, successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe/search?words=${words}`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const whetherRecipeLike = (
  user_id,
  recipe_id,
  successFunc,
  failedFunc
) => {
  fetch(`${API_URL}/user/whether_like_recipe/${user_id}/${recipe_id}`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const likeRecipe = (user_id, recipe_id, successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe/${recipe_id}/is_liked_by/${user_id}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const unlikeRecipe = (recipe_id, user_id, successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe/${recipe_id}/is_unliked_by/${user_id}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => successFunc(data));
};
