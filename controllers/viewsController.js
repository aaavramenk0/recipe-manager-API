const db = require('../models');
const Recipe = db.recipe;

const viewsController= {};

viewsController.buildRecipeView = async function(req, res){
    let card;
  
    //req.flash("notice", "This is a flash message.")

    Recipe.find({})
    .then((data) => {
      //console.log(data);
      card = `<ul class="recipeCard">`
      data.forEach(element => {
        card += '<li>'
        card += `<img src= "`+ element.imgUrl +`">`
        card += `<h2>`+ element.name + `</h2>`
        card += `</li>`
       
        
      });
      card += `</ul>`
      res.status(201).render("recipes/recipe", {
        title: "Recipes",
        card,
      })
    
    })
        
   
  
   
    
  }

  module.exports = viewsController;