// first require

const express = require('express');

// call the function app to streamline
const app = express();


// Exercise 1
app.get('/greetings/:username', (req, res, next) => {
    res.send(`<h1>Hello ${req.params.username} and welcome!</h1>`);
});

// Exercise 2
app.get('/roll/:number', (req, res, next) => {
    if (isNaN(req.params.number)) {
        res.send(`You must specify a number.`)
    } else {
        res.send(`You rolled a ${req.params.number}`)
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
    
    // create a filter for the minimum
    if (req.query.minimum !== undefined) {
        for (i in shoes) {
            if (req.query.minimum > shoes[i].price) {
                shoes.splice(i, 1)
            }
        }
    }
    
    // create a filter for the maximum
    if (typeof req.query.maximum !== undefined) {
        for (i in shoes) {
            if (req.query.maximum < shoes[i].price) {
                shoes.splice(i, 1)
            }
        }
    }

    // create a filter for the type
    if (req.query.type !== undefined) {
        for (i in shoes) {
            if (req.query.type !== shoes[i].type) {
                shoes.splice(i, 1)
            }
        }
    }

    // send the response
    for (i in shoes) {
        let results = []
        for (i in shoes) {
            results.push(shoes[i].name)
        }
        res.send(`Here are the shoes that match your interests ${results}.`)
    }
});


// launch the port
app.listen(3000, () => {
    console.log(`Listening on port 3000`)
})