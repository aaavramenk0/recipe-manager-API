const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const dbConfig = require('../config/db.config');
const db = require('../models');
const Recipe = db.recipe;
const Author = db.author;

const api = supertest(app);

require("dotenv").config();
const port = 'https://recipe-manager-api.onrender.com';

/* Start the server before test */
beforeEach(async () => {
    await mongoose
        .connect(dbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            console.log('Cannot connect to the database!', err);
            process.exit();
        });
});

/* Close the server after each test */ 
afterEach(async () => {
    await mongoose.connection.close();
});

// GET test for the /views page
describe('GET /views', () => {
    test('should return recipes view', async () => {
        const res = await supertest(app).get("/views");
        expect(res.statusCode).toBe(201);
    });
});

// GET test for /recipes route
describe('GET /recipes', () => {
    test('should return all recipes from the database', async () => {
        await api
            .get('/recipes')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});

// GET test for /authors route
describe('GET /authors', () => {
    test('should return all authors from the database', async () => {
        await api
            .get('/authors')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});


// POST test for /recipes route
describe('POST /recipes', () => {
    test('should put a new recipe to the database', async () => {
        // build a new recipe 
        const newRecipe = {
            "imgUrl" : "https://www.budgetbytes.com/wp-content/uploads/2023/06/BLT-Pasta-Salad-side.jpg",
            "name" : "BLT PASTA SALAD",
            "rating": "4.75 from 4 votes",
            "description" : "This BLT pasta salad recipe is the perfect summer meal! It's easy to make, full of flavor, and perfect for a potluck or picnic.",
            "author" : {
                "name" : "Beth",
                "url" : "https://www.budgetbytes.com/author/beth/"
            },
            "cookTime" : "25minutes mins",
            "ingredients" : ["8 oz. bacon", "3/4 cup mayonnaise", "1/4 cup ranch dressing", "2 Tbsp lemon juice", "1/2 tsp salt", "1/4 tsp freshly cracked pepper", "12 oz. bowtie pasta", "1 pint grape tomatoes", "1/4 red onion", "2 cups fresh spinach (packed)"],
            "instructions" : [
                "Cook the bacon in a large skillet over medium heat until brown and crispy. Transfer the cooked bacon to a paper towel-lined plate to drain and cool. Once cooled, chop or crumble the bacon into smaller pieces.", 
                "While the bacon is cooking, prepare the dressing. Stir together the mayonnaise, ranch dressing, lemon juice, salt, and pepper. Set the dressing aside.", 
                "Bring a large pot of salted water to a boil for the pasta. Once boiling, add the pasta and cook until tender (7-8 minutes). Drain the pasta in a colander, rinse it briefly with cool water to cool it down, then let it drain very well.", 
                "While the pasta is cooking and draining, prepare the vegetables. Slice the grape tomatoes in half, finely dice the red onion, and roughly chop the spinach.", 
                "Once the pasta is cooled and drained, add it to a large bowl along with the spinach, tomatoes, onions, and dressing. Stir everything together until evenly combined and coated in dressing. Let the pasta sit for 10-15 minutes for the flavors to blend, then stir once more and serve." 
            ],
            "equipment" : ["Chef's knife", "White cutting boards", "Nonstick fry pans"],
            "nutrition" : {
                "protein" : "10g",
                "fiber" : "2g",
                "calories" : "466kcal",
                "fat" : "31g",
                "carbohydrates" : "36g",
                "sodium" : "546mg"
            }
        }
    
        await api
            .post('/recipes')
            .send(newRecipe)
            .expect(200);
        
        // get all recipes from the DB
        const recipes = await Recipe.find({})

        //let's check that the last item added was indeed newItem object
        //it should contain the description "sent from Jest!"
        expect(recipes[recipes.length-1].name).toBe("BLT PASTA SALAD")
    })
});

// POST test for /authors route
describe('POST /authors', () => {
    test('should add a new author to the database', async () => {
        // build a new author
        const newAuthor = {
            "name" : "Aysegul",
            "companyName" : "Budget Bytes (Contributor)",
            "description" : "Aysegul Sanford, aka Ice, is the author behind foolproofliving.com, where she shares healthy tried and true recipes that are made without the use of refined sugars. She grew up in Turkey but traveled throughout the world always on a mission to further broaden her knowledge of cooking and flavors. Her favorite toy is her camera and she is almost always in the kitchen taking pictures of delicious food.",
            "photo" : "https://www.budgetbytes.com/wp-content/uploads/2022/07/Aysegul-Sanford-6258-e1657387559295-160x160.jpg"
        }
    
        await api
            .post('/authors')
            .send(newAuthor)
            .expect(200);
        
        // get all authors from the DB
        const authors = await Author.find({})

        //let's check that the last item added was indeed newItem object
        //it should contain the description "sent from Jest!"
        expect(authors[authors.length-1].name).toBe("Aysegul")
    })
});