const db = require('../models');
const utilities = require('../utilities/index.js');
const Recipe = db.recipe;
const Author = db.author;

//const viewsController= {};

const buildRecipeView = async function(req, res){
    let card;
  
    //req.flash("notice", "This is a flash message.")

    Recipe.find({})
    .then((data) => {
      //console.log(data[0]._id);
      card = `<ul class="recipeCard">`
      data.forEach(element => {
        //console.log("inside "+element._id);
        card += '<li>'
        card += `<a href="` + `/views/recipe-detail/`+ element._id +`"><img src= "`+ element.imgUrl +`">` + `</a>`
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
   
/********************************
* build authors view
* 
********************************/
const buildAuthorView = async function(req, res){
  let card;

  Author.find({})
  .then((data) => {
    //console.log(data[0]._id);
    card = `<ul class="recipeCard">`
    data.forEach(element => {
      //console.log("inside "+element._id);
      card += '<li>'
      card += `<a href="` + `/views/author-detail/`+ element._id +`"><img src= "`+ element.photo +`">` + `</a>`
      card += `<h2>`+ element.name + `</h2>`
      card += `</li>`
     
      
    });
    card += `</ul>`
    res.status(201).render("authors/author", {
      title: "Authors",
      card,
    })
  
  })  
}

/********************************
* build recipe detail view
* 
********************************/
const buildRecipeDetailView = async function(req, res){
  try {
    const _id = req.params.id; 
    Recipe.findById(_id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: 'Recipe not found.' });
        }
        let dataGrid = utilities.renderRecipeDetail(data);
        res.status(201).render("recipes/recipe-detail", {
          title: data.name,
          dataGrid
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving the recipe.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

/********************************
* build recipe detail view
* 
********************************/
const buildAuthorDetailView = async function(req, res){
  try {
    const _id = req.params.id; 
    Author.findById(_id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: 'Author not found.' });
        }
        let dataGrid = utilities.renderAuthorDetail(data);
        res.status(201).render("authors/author-detail", {
          title: data.name,
          dataGrid
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving the recipe.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};




  module.exports = {
    buildRecipeView, 
    buildRecipeDetailView,
    buildAuthorView,
    buildAuthorDetailView
  };