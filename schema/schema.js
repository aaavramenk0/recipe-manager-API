const graphql = require('graphql');
const db = require('../models');
const Recipe = db.recipe;


const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
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
 


//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery
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
******************************************************************************/