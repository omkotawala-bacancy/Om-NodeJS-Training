/*
    // math.js
    exports.add = (a,b) => a + b;
    exports = (a,b) => a * b;

    //Another file:

    const math = require('./math');
    console.log(math.add(2,3));

    a) What will be the output and why?

    Answer: the output will be the 5 because the exports is only the reference to the moule.exports and here the second exports only reassigns the local exports variable and does not modify module.exports. Since require() returns module.exports, the exported object still contains only the add function.

    b) Explain why assigning a value to exports is a problem.

    Answer: Assigning a value to exports is problematic because exports is only a reference to module.exports. Reassigning exports changes only the local variable and does not modify module.exports. Since require() returns module.exports, the new value assigned to exports is not exported from the module.
*/

// c) Rewrite the module correctly so both add and multiply functions are exported.

//There are two ways :
//math.js

//1).
exports.add = (a,b) => a + b
exports.multiply = (a,b) => a * b

//2).
module.exports = {
    add: (a,b) => a + b,
    multiply: (a,b) => a * b
}