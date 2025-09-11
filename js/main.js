"use strict";

/*
PLAN
    I. CONSTRAINTS  
        A. Must output to display

    II. OPERATIONS


    III. GOAL(S)
        

    IV. DIVIDE
        A. PHASES
            1. Variables


            2. Methods/Properties
        


            3. Conditionals/Loops
        

        B. STEPS
            1. function to split string into array elements at operators
            2. store calculator buttons in elements
        
    V. DO WHAT YOU KNOW
        A. OBVIOUS SOLUTIONS
        
        B. PROBLEMS WITH MOST CONSTRAINTS

    VI. REDUCE

    Possible solutions:

    Thoughts: 
        - btn elem text to set property names?
        - what happens when i attach event listener to elem inner text?
*/

let btnElem = Array.from(document.querySelectorAll(".btn"));
let btnTxt = btnElem.map((elem) => elem.innerText);

//adds an event listener to each button
(function() {
    for(let elem of btnElem){
        elem.addEventListener("click", (() => console.log(`this button is ${elem.innerText}`)));
    }
})();

//splits elements at the operator and pushes the values and operators as separate elements into an array
function splitAtOp(str){
    let val = "";
    let arr = [];
    for (let elem of str){
        if(+elem || elem === "0" || elem === ".") {
            val += elem
        } else {
            arr.push(val);
            arr.push(elem);
            val = "";
        }
    }
    if (val !== ""){
        arr.push(val);
        val = "";
    }
    return [val, arr];
}

console.log();
