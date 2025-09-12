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
        elem.addEventListener("click", (() => {}));
    }
})();

(function() {
    for(let elem of btnElem){
        console.log(+elem.innerText)
        if(+elem.innerText){
            elem.addEventListener("click", storeNumValue);
        };
    }
})();

function storeNumValue(){
    calculator.value += this.innerText;
    console.log(calculator.value)
}

let calculator = new function(){
    this.value = "";
    this.arr = [];
    this.method = function(){   //splits elements at the operator and pushes the values and operators as separate elements into an array
        for (let elem of str){
            if(+elem || elem === "0" || elem === ".") {
                this.value += elem
            } else {
                arr.push(this.value);
                arr.push(this.elem);
                val = "";
            }
        }
        if (value !== ""){
            arr.push(this.value);
            this.value = "";
        }
        return [this.value, this.arr];
    }
}

console.log();
