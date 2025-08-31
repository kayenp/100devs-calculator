"use strict";
//pseudocode
/*
    - attach event listeners to "buttons"
    - each value should be an object?
    - symbols are methods
        -define each method
            -all methods should be on base object for ease of maintenance?
            -function to pass in operations for each operator button?
            -how to pass in arguments in method?

    - need to output each key press to "screen"
        "screen" as an object?

    1. Create calculator obj
    2. Loop through "buttons" to create objects with those values

*/

let btnsArr = Array.from(document.querySelectorAll(".btn")); // set value as hidden in object
let btnsTxt = btnsArr.map((elem) => elem.innerText); //set value as hidden in object

//encapsulation: no arguments passed into function?
function CreateObj() {
    let source = undefined;
    this.method = console.log(Object.keys(this));

    Object.defineProperty(this, source, {
        get: (function() {
            source =  Array.from(document.querySelectorAll(".btn")).map((elem) => elem.innerText)
        })()
    });
    
    Object.defineProperty(this, "", {
        get: (function() {
            source.reduce((acc,currVal) => {
                if (Number(currVal) || currVal === "0") {
                    console.log(this);
                    acc[currVal] = currVal;
                    return acc;
                } else {
                    acc[currVal] = undefined;
                    return acc;
                }
            }, this)
        }.bind(this))()
    })
};

let newObj = new CreateObj();


console.log(newObj[7]);