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
let calcDisplay = document.querySelector(".div-output");
let pattern = /[\+\-\*\/]/;

//bound to each button except "="
function storeNumValue(){
    calculator.value += this.innerText; //adds pressed input value to calculator.value
    console.log(calculator.value, calculator.arr)
}

//bound only to "=", begins calculating result
function calculate(){
    console.log((calcDisplay.innerText.slice(0,-1)));  
    if(pattern.test(calcDisplay.innerText.slice(-1))){
        calcDisplay.innerText = calcDisplay.innerText.slice(0,-1);
        calculator.value = calcDisplay.innerText;
    }
    console.log(calcDisplay.innerText, calculator.value, calculator.arr)                   
    calculator.toArr() //passes calculator.value to calculator.toArr for conversion of string to array with each group of numbers and each operator in a separate element
}                      

//bound to each button except "="
function outputDisplay(){
    if(Number(this.innerText)){
        calcDisplay.innerText += this.innerText
    } else {  
        if(!pattern.test(calcDisplay.innerText.slice(-1))){
            calcDisplay.innerText += this.innerText;
        } else {
            calcDisplay.innerText = calcDisplay.innerText.slice(0,-1) + this.innerText;
            calculator.value = calcDisplay.innerText.slice(0,-1); 
        }
    };  
}

let calculator = new function(){ //this is an object
    this.value = ""; 
    this.arr = []; //<--- need a function to pass value into this when equal button is pressed
    this.toArr = function(){   
        this.arr =  this.value.split(/([0-9]+)/).filter((elem) => elem !== ""); //splits value at the operator, outputs to new array, deletes empty ""
        this.value = "";
        this.toOperate(this.arr); //begins evaluation of array elements for result
    };
    this.insertResults = function(pos, result){ //inserts results from evalArr() into array and then recurses toOperate();
        this.arr.splice(pos,3,result);
        calculator.toOperate(this.arr);
    }
    this.toOperate = function(arr){
        for(let h = 0; h <= 1; h++){    //loop to evaluate * & / switch statements on 1st pass, + & - on 2nd pass
            evalArr(h);
        }
        function evalArr(index){    //evaluation function for symbols in array, recursively returns until array.length value = 1
            if(arr.length <= 1){
                console.log(arr, "This array is done");
                return arr;
            } else {
                    for (let i = 0; i < arr.length; i++){
                        let prevInd = arr[i-1];
                        let nextInd = arr[i+1];
                        if (index < 1){
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
                        } else {
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
                        };                           
                    }           
            }
            return calcDisplay.innerText = arr.join("");
        };
    }
};

(function() {
    for(let elem of btnElem){
        if(elem.innerText !== "="){
            elem.addEventListener("click", outputDisplay);
        };
    };
})();

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



