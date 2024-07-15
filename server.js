// first require

const express = require('express');

// call the function app to streamline
const app = express();


// Exercise 1
app.get('/greetings/:username', (req, res, next) => {
    res.send(`<h1>Hello ${req.params.username} and welcome!</h1>`);
});

// Exercise 2

const getRandomNum = (input) => {
    return Math.floor(Math.random()*input)
};

app.get('/roll/:number', (req, res, next) => {
    
    
    if (isNaN(req.params.number)) {
        res.send(`You must specify a number.`)
    } else {
        res.send(`You rolled a ${getRandomNum(req.params.number)}`)
    };    
});

// Exercise 3

// best practice is to call const at beginning (but for the exercise I'll do it here)
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


app.get('/collectibles/:index', (req, res, next) => {
    const idx = req.params.index
    if (idx < 3) {
        res.send(`So, you want a ${collectibles[idx].name}? For ${collectibles[idx].price}, it can be yours!`)
    } else {
        res.send('This item is not yet in stock. Check back soon!')
    }
})

// Exercise 4

// queries are always signified by the ? in the url
// key=value pairs are how user inputs are recognized in the url
// this is good for search engines

// sample code
app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

// again, best practice is name const at the beginning
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.


app.get('/shoes', (req, res, next) => {
    
    const min = req.query.minimum
    const max = req.query.maximum
    const type = req.query.type

    // create a const to be reset after each search
    let tempShoes = [...shoes]
    let results = []

    // create a filter for the minimum
    if (min !== undefined) {
        tempShoes = tempShoes.filter((shoe) => min < shoe.price)
    }
    
    // create a filter for the maximum
    if (req.query.maximum !== undefined) {
        tempShoes = tempShoes.filter((shoe) => max > shoe.price)
    }

    // create a filter for the type
    if (req.query.type !== undefined) {
        tempShoes = tempShoes.filter((shoe) => type == shoe.type)
    }

    // log the results
    for (i in tempShoes) {
        results.push(tempShoes[i].name)
    }

    // send the response
    if (tempShoes.length) {
        res.send(`Here are the shoes that match your interests ${results}.`)
    } else {
        res.send(`Looks like we don't have what you are looking for.`)
    }
});

// launch the port
app.listen(3001, () => {
    console.log(`Listening on port 3001`)
})