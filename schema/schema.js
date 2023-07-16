const graphql = require('graphql');

const Recipe = require('../models/recipes');

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
  })

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error AuthorType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        imgUrl: { type: GraphQLString },
        name: { type: GraphQLString },
        rating: { type: GraphQLString },
        description: { type: GraphQLString },
        author: {type: author_type }, 
            
        cookTime: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        instructions: { type: GraphQLString },
        equipment: { type: GraphQLString },
        nutrition: { type: GraphQLString },
        
        
       
    
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

mutation{
  addAuthor(name: "Manto", age: 55)
  {
    name
    age
  }
  
}

mutation{
  addBook(name: "Science", pages: 350, authorID: "64a26c05580455256550ac49")
  {
    name
    pages
  }
}

for all books query
{
	books{
    id
    name
    pages
    author{
      id
      name
      age
    }
  
	}
}

for all authors
{
  authors{
    id
    name
    age
  }
}

******************************************************************************/