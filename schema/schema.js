const graphql = require('graphql');
const db = require('../models');
const Recipe = db.recipe;


const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull,
    GraphQLInputObjectType 
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and describes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   
/******************************************
 * Recipe type for graphql
 * 
 * ***************************************/
const author_type = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
      name: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  });

  const author_input_type = new GraphQLInputObjectType({
    name: 'author_input',
    fields: () => ({
      name: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  });


  const nutrition_type = new GraphQLObjectType({
    name: 'nutrition',
    fields: () => ({
      protein: { type: GraphQLString },
      fiber: { type: GraphQLString },
      calories: { type: GraphQLString },
      fat: { type: GraphQLString },
      carbohydrates: { type: GraphQLString },
      sodium: { type: GraphQLString },
    }),
  });
// for Mutatation object data type input
const nutrition_input_type = new GraphQLInputObjectType({
    name: 'nutrition_input',
    fields: () => ({
      protein: { type: GraphQLString },
      fiber: { type: GraphQLString },
      calories: { type: GraphQLString },
      fat: { type: GraphQLString },
      carbohydrates: { type: GraphQLString },
      sodium: { type: GraphQLString },
    }),
  });


 
  

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error RecipeType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        imgUrl: { type: GraphQLString },
        name: { type: GraphQLString },
        rating: { type: GraphQLString },
        description: { type: GraphQLString },
        author: {type: author_type }, 
            
        cookTime: { type: GraphQLString },
        ingredients: { type: new GraphQLList(GraphQLString) },
        instructions: { type: new GraphQLList(GraphQLString) },
        equipment: { type: new GraphQLList(GraphQLString) },
        nutrition: { type: nutrition_type },
    
    })
});

//RootQuery describe how users can use the graph and grab data.

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe:{
            type: RecipeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Recipe.findById(args.id);
            }
        },
        recipes:{
            type: new GraphQLList(RecipeType),
            resolve(parent, args) {
                return Recipe.find({});
            }
        }
    }
});
 
//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRecipe: {
            type: RecipeType,
            args: {
                //GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) },
                imgUrl: { type: new GraphQLNonNull(GraphQLString) },
                rating: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                cookTime: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(author_input_type) },
                equipment: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                instructions: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                ingredients: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                nutrition: { type: new GraphQLNonNull(nutrition_input_type) },
            },
            resolve(parent, args) {
                let recipe = new Recipe({
                    name: args.name,
                    imgUrl: args.imgUrl,
                    rating: args.rating,
                    description: args.description,
                    cookTime: args.cookTime,
                    author: args.author,
                    equipment: args.equipment,
                    instructions: args.instructions,
                    ingredients: args.ingredients,
                    nutrition: args.nutrition,
                });
                return recipe.save();
            }
        },
        deleteRecipe: {
          type: RecipeType,
          args: {
              //GraphQLNonNull make these field required
              id: { type: new GraphQLNonNull(GraphQLID) },
          },
          resolve(parent, args) {
            console.log(args.id);

              return Recipe.findByIdAndDelete(args.id);
          }
      },
      updateRecipe: {
        type: RecipeType,
        args: {
          id: { type: GraphQLID  },
          name: { type: GraphQLString },
          imgUrl: { type: GraphQLString },
          rating: { type: GraphQLString },
          description: { type: GraphQLString },
          cookTime: { type: GraphQLString },
          author: { type: author_input_type },
          equipment: { type: new GraphQLList(GraphQLString) },
          instructions: { type: new GraphQLList(GraphQLString) },
          ingredients: { type: new GraphQLList(GraphQLString) },
          nutrition: { type: nutrition_input_type },
            
        },
        resolve(parent, args) {
          console.log(args.id);

          return Recipe.findByIdAndUpdate(args.id, args, {new: true});
        }
    }


    }
});


//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

/****************************************************************************
Queries
{
	recipes{
        id
        name
        author{
                name
                url
        }
	}
}
//another query example

{
	recipes{
    id
    name
    rating
   
    author{
      name
      url
    }
    ingredients
    instructions
    equipment
    nutrition{
      sodium
    }
	}
}

***                  ***
*** For Single Query *** 
***                  ***
{
recipe (id: "64b06de5756c8eee1e1a4cd7"){
id
name
rating
   
author{
name
url
}
ingredients
instructions
equipment

nutrition{
sodium
}

}
}

//mutation
mutation{
  addRecipe(
    name: "Microwave Corn on the Cob ", 
    imgUrl: "https://www.budgetbytes.com/wp-content/uploads/2023/07/Microwave-Corn-on-the-Cob-V2-500x375.jpg",
  	description: "Perfectly cooked Microwave Corn On The Cob because the last thing you want to do when it’s 156 bazillion degrees outside is turn on a grill, stove, or oven. #amiright?!?!? Cooking corn on the cob in a microwave gives you kernels that pop with sweet juiciness, and there’s no large pot of water to boil, no grill to heat and then scour clean, and no air-conditioning-killing oven to preheat.",
    rating: "5 from 2 votes",
    author: {name: "Monti", url: "https://www.budgetbytes.com/author/monti/"},
    equipment: ["Microwave", "Plates", "Sticks"],
    cookTime: "40min",
    instructions: [
    "Cut the cobs to fit your microwave using its inner revolving plate as your guide. Do not peel off the husks. If your corn cobs don’t have a husk and are already trimmed, just go to step 2.",
    "Place each cob under running water and soak through. Wrap each in a wet paper towel. Place the cobs in the microwave and cook on high for 16 minutes or 4 minutes per cob. Cooking time can vary depending on the wattage of your microwave and the size of the cobs.",
    "The cobs are done when the kernels' color has deepened and become glossy. Allow the cobs to cool until you can hold them without burning yourself. Remove the paper towel and cut off the stem end of the cobs.",
    "Peel the husks off from the top down to the stem end. Clean off any stray strands of cornsilk. Top with 1 tablespoon of salted butter per cob and serve!"
    ],
    ingredients: [
      "4 large corn cobs in their husk",
      "4 Tbsp salted butter"
    ],
    nutrition: {
      protein: "5g",
      fiber: "3g",
      calories: "223 Kcal",
      fat: "13g",
      carbohydrates: "27g",
      sodium: "111mg"
    }
    
  )
  {
    name
    imgUrl
    description
    rating
    author{
      name
      url
    }
    equipment
    cookTime
    instructions
    nutrition{
      protein
      fiber
      calories
      fat
      carbohydrates
      sodium
    }
  }
  
}
mutation{
  deleteRecipe(id: "64b52ff19fb07d8ffc989a02"){
    id
    name
  }
  
}

//update recipe
mutation{
  updateRecipe(id:"64b25e3e47eb8764e876d53a",
  name: "Blt Pasta Salad"
  
  ){
    name
    
  }
}

******************************************************************************/