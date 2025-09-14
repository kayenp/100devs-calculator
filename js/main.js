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
        this.toOperate(this.arr);
    };
    this.insertResults = function(pos, result){ //inserts results from operator functions into array and returns array to method for re-evaluation
        this.arr.splice(pos,3,result);
        calculator.toOperate(this.arr);
    }
    this.toOperate = function(arr){
        if(arr.length <= 1){
            console.log(arr, "This array is done");
            return arr;
        } else {
            //for (let h = 0; h <= 1; h++){
                for (let i = 0; i < arr.length; i++){
                    let prevInd = arr[i-1];
                    let nextInd = arr[i+1];
                    //if (h < 1){
                        switch(arr[i]){
                            case "*":
                                (() => {
                                    let result = +prevInd * +nextInd
                                    calculator.insertResults(calculator.arr.indexOf(arr[i-1]), result);
                                })();
                                break;
                            case "/":
                                (() => {
                                    let result = Number(prevInd) / Number(nextInd);
                                    calculator.insertResults(calculator.arr.indexOf(arr[i-1]), result);
                                })();
                                break;
                        }
                    //} else {
                        switch(arr[i]){
                            case "+":
                                (() => {
                                    let result = +prevInd + +nextInd;
                                    calculator.insertResults(calculator.arr.indexOf(arr[i-1]), result);
                                })();
                                break;
                            case "-":
                                (() => {
                                    let result = Number(prevInd) - Number(prevInd);
                                    calculator.insertResults(calculator.arr.indexOf(arr[i-1]), result);
                                })();
                                break;
                        }
                    //};
                }
            //}
        }
        return arr;
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


