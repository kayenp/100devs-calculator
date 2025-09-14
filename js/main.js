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
function storeNumValue(){
    calculator.value += this.innerText; //<---- this doubles up on calculator.value
    console.log(calculator.value, calculator.arr)
}

function calculate(){
    calculator.toArr()
}

let calculator = new function(){
    this.value = ""; 
    this.arr = []; //<--- need a function to pass value into this when equal button is pressed
    this.toArr = function(){   
        this.arr =  this.value.split(/([0-9]+)/).filter((elem) => elem !== ""); //splits value at the operator, outputs to new array, deletes empty ""
        this.value = "";
        console.log(this.arr);
        this.toOperate(this.arr);
    };
    this.toOperate = function(arr){
        console.log(arr.length, arr);
        if(arr.length === 1){
            console.log(arr, "This array is done");
            return arr;
        } else {
            for (let i = 0; i < arr.length; i++){
                let prevInd = arr[i-1];
                let nextInd = arr[i+1];
                switch(arr[i]){
                    case "+":
                        (function(){
                            insertResults(+prevInd + +nextInd);
                        })();
                        break;
                    case "-":
                        (function(){
                            insertResults(Number(prevInd) - Number(nextInd));
                        })();
                        break;
                };
                function insertResults(result){ //inserts results from operator functions into array and returns array to method for re-evaluation
                    arr.splice((i-1),3,result);
                    calculator.toOperate(arr);
                }
            }
        }
    }
};

(function() {
    for(let elem of btnElem){
        if(elem.innerText !== "="){
            elem.addEventListener("click", storeNumValue);
        };
    };
})();

(function() {
    for(let elem of btnElem){
        if(elem.innerText === "="){
            elem.addEventListener("click", calculate); //<--- double check this is working
        };
    };
})();


