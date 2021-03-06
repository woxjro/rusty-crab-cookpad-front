const API_URL = "http://127.0.0.1:8000/api";

export const recipe = (recipe_id, user_id, successFunc, failedFunc) => {
  const URL = user_id
    ? `${API_URL}/recipe/${recipe_id}/by/${user_id}`
    : `${API_URL}/recipe/${recipe_id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const likedRecipes = (user_id, successFunc, failedFunc) => {
  fetch(`${API_URL}/user/liked_recipes/${user_id}`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const createdRecipes = (
  user_id,
  category_id,
  tag_id,
  successFunc,
  failedFunc
) => {
  fetch(
    `${API_URL}/recipe/query?user_id=${user_id}&category_id=${category_id}&tag_id=${tag_id}`
  )
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const recipes = (successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const tags = (successFunc, failedFunc) => {
  fetch(`${API_URL}/tag`)
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const categories = (successFunc, failedFunc) => {
  fetch(`${API_URL}/category`)
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

export const likeRecipe = (recipe_id, user_id, successFunc, failedFunc) => {
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

export const createRecipe = (recipe, successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const updateRecipe = (recipe, successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((res) => res.json())
    .then((data) => successFunc(data));
};

export const deleteRecipe = (recipe_id, user_id, successFunc, failedFunc) => {
  fetch(`${API_URL}/recipe/delete/${recipe_id}/by/${user_id}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => successFunc(data));
};
