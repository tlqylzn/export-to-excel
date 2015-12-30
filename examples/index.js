'use strict';

const calculations = require('../index.js');

const Square = calculations.Square;
const Circle = calculations.Circle;
const factorial = calculations.factorial;
const factorialAsync = calculations.factorialAsync;

let sq = new Square(5);
let circ = new Circle(5);

console.log(`Perimeter of Square(l = 5): ${sq.perimeter}`);
console.log(`Area of Square(l = 5): ${sq.area}`);

console.log(`Perimeter of Circle(r = 5): ${circ.perimeter}`);
console.log(`Area of Circle(r = 5): ${circ.area}`);

console.log(`Factorial of 4: ${factorial(4)}`);
factorialAsync(10)
    .then((res) => {
        console.log(`Factorial of 10: ${res}`);
    });
