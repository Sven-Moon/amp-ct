export const postRecipeData = async (form) => {
  let url = 'http://127.0.0.1:5000/api/v1/recipes/create'
  let body = JSON.stringify(form)
  console.log(body);
  let options = {
    method: 'POST',
    body: body,
    headers: { 'Content-Type': 'application/json' }
  }
  fetch(url, options).then(res => res.json()).then(json => console.log(json))
  .catch(err =>  console.log(err))
}