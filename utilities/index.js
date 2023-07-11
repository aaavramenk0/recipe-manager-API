const db = require('../models');
const Recipe = db.recipe;


// GET request that retrieves all recipes from the database
const renderRecipes = (req, res) => {
  try {
    Recipe.find({})
      .then((data) => {
        //console.log(data);
      return data;
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving recipes.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Render recipe detail by id
const renderRecipeDetail = function (data) {
  try {
    console.log(data);
  

    let recipeDetail = `<div class="recipe-container">`
    recipeDetail += `<div class="imageDetails"><img src="`+data.imgUrl+`">`+`</div>`
    recipeDetail += `<ul class="detail-list">`
    recipeDetail += `<li>Recipe Author: `+`<a href="`+ data.author.url +`"target="_blank">` +data.author.name +`</a></li>`

    recipeDetail += `<li><p> Description: `+ data.description + `</p></li>`
    recipeDetail += `<li> Equipment: `+ listItems(data.equipment)  + `</li><br>`
    recipeDetail += `<li>Ingredients: `+ listItems(data.ingredients) +`</li><br>` 
  
    recipeDetail += `<li> Instructions: `+ listItems(data.instructions)  + `</li>`

    recipeDetail += `</ul>`
    recipeDetail += `</div>`

    return recipeDetail;
  } catch (err) {
    console.log(err);
  }
};

function listItems(list){
  let items = `<ul>`
  list.forEach(item => {
    items += `<li>`+ item + `</li>`
   
  }); 
  items += `</ul>`
  return items;
}

module.exports = {renderRecipes, renderRecipeDetail}
