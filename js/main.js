"use strict";

//PSEUDOCODE
/*
PLAN
    I. CONSTRAINTS
        A. In Writing
            1. Must be submitted in OOP
                i. Must follow pillars of encapsulation, abstraction, inheritance and polymorphism
                    a. No parameters
            2. Must not use eval()
        B. In Program
            1. Must display inputs
            2. Must display results/outputs
            3. Must be able to store values for operations
            4. Must be able to retrieve values for operations
            5. Must be able to add, subtract, multiply, divide as arithmetic operations
    II. OPERATIONS
        A. User
            1. Can click on elements to input values or perform arithmetic operations
        B. Program
            1. Display inputs
            2. Display results/outputs
            3. Store values
            4. Retrieve values
            5. Basic arithmetic operations
    III. DIVIDE INTO PHASES/STEPS
        A. Determine general structure/object type for calculator
            1. Object
                i. Create object using constructor function? Or Object.create()? 
                    a. If using Object.create() have to create object to use as prototype.
                        i) Only needs prototyping if multiple objects need access to same value/functions/methods
        B. Determine how elements can be "clicked"
            1. Elements must be accessible by JS
                i. Target elements in DOM <-------- ACTION
                ii. Return elements to JS <-------- ACTION
            2. Elements need functionality
                i. use .addEventListener() with function on elements. 2 separate .addEventListener() functions.
                    a. Numeric and arithmetic operations have different behavior
                        i) compose numeric function
                        ii) compose arithmetic operation function
        C. Determine how to store values
            1. Arrays inside of object
        D. Determine how to retrieve values
            1. Array index lookup inside of object property
        E. Determine how to display inputs/results
            1. Results/inputs need to be added to DOM for display
        F. Determine how to perform arithmetic operations
            1. arithmetic operations should be grouped if using objects
                i. arithmetic operations would be stored as values with corresponding property names
        G. Refactor
    IV. USE WHAT YOU KNOW
        A. Use tools at hand
        B. Solve portions that are obvious
        C. Solve portions that have the most constraints
    V. REDUCE INTO SMALLER PROBLEMS

    =========
    THOUGHTS
    =========
    - Use closures to create a new object from an object constructor
    - Why does Object.defineProperty say it's not an object for "_" ???
        Because "new" operator wasn't used on outer function, misplacing context of "this" in Object.defineProperty()
    - Abstracting code so that the elements on an object are not interactable (hence "private) is different than "hiding" code from being viewed
    - Getters & setters should only be used if you want user to interact with private elements without altering their contents
    - Property identifiers that correspond with values make sense when looking up propert
        - Obj values are accessed through properties. If you're trying to get a value, you need to find the corresponding property first (which is why delete works -- it unlinks property references, making values "lost")
            - So easiest way to find a value for a property is to use a property that corresponds with the value name
    - Pressing buttons immediately updates the display
    - Pressing operator button sends all previous numerical values into array and then sends itself into array
        ^When op btn is pressed, if last array element already stored op value, overwrite previous op value with current op value
        ^Operations aren't done until "=" is used
        ^Issue when pressing operator key twice in a row it pushes display value to array an additional time
            CONSTRAINTS
                Needs to update the display and store the value without double adding the display or double adding the value

    

                

    ===STEPS===
    1. Create ScreenObj
    1. Create fn that outputs button presses to DOM
        ^Need variable that targets display in calc
        ^Screen object can store values and updates DOM from it's values?
    5. Create function that creates a numBtn obj that has properties with the same value stored inside
    6. Create way to store values and how to determine which values are stored
        Would calc allow for chained operators or each operator return a value?
            - Chained operators more complicated
                ^Would require order of operations to evaluate? Can't evaluate string unless w/ eval
                ^Chained operators need to take into account position within array for GEMDAS order of operations
                ^Will need recursion within function to reduce array to single value
            - Store all number values and operators as separate array elements
                - Number elements would need to be coerced to numbers
                - Operator elements would need to be checked and then appropriate function accessed from obj
                    ^Would require if...else statement to check whether number or operator
    7. Store values in array.
        A. Function to store values into array
        B. Function to retrieve values from ".innerText" due to "this" context changing <---- DONE
    8. Create methods and assign them to operator properties as values
        ^Need to know how values are stored before access to write function to retrieve values
    
*/

//Calculator object contains all other objects
function CreateCalcObj(){
    let screenDiv = document.querySelector(".div-output");
    let btnElemArr = Array.from(document.querySelectorAll(".btn"));
    let btnTxtArr = btnElemArr.map((elem) => elem.innerText);
    let numBtnArr = btnTxtArr.filter((elem) => (Number(elem)));
    let opBtnArr = btnTxtArr.filter((elem) => ((!Number(elem)) && (elem !== ".") && (elem !== "0")));
    let opBtnElemArr = btnElemArr.filter((elem) => (elem.innerText !== Number(elem) && (elem.innerText !== "0") && (elem.innerText !== ".")));
    
    function CreateStorageObj(){
        this.value = [];
    }
    let storageObj = new CreateStorageObj();

    //creates a screen object
    function CreateScreenObj(){
        this.display = "";
        this.updateDisplay = function(val) {
            let displayLength = this.display.length;
            if((Number(val)) || val === "."){
                this.display = this.display + val;
            } else if (val === "+" || val === "-" || val === "*" || val === "/"){
                if((!Number(this.display[displayLength-1])) || this.display[displayLength-1] === "."){
                    this.display = this.display.slice(0, displayLength-1) + val;
                } else if (this.display !== "") {
                    this.display = this.display + val;
                }
            }
            screenDiv.innerText = this.display; 
            console.log(storageObj.value);
        }
    };
    let screenObj = new CreateScreenObj();

    //Object containing calc btns 
    function CreateBtnsObj(){
        return btnTxtArr.reduce((acc,currVal) => {
            if ((Number(currVal)) || (currVal === "0") || (currVal === ".")){
                acc[currVal] = currVal;
                return acc;
            } else {
                acc[currVal] = "insert fn";
                return acc;
            }
        },{})
    }
    let btnsObj = new CreateBtnsObj();

    //stores screenObj.display value to array
    //ADD -- function to add currently pressed operator to array
    //ADD -- function the check if last value in array is operator, if so overwrites with most recent operator
    function Operation(){
        this.valArr = [screenObj.display];
        console.log(this);
        this.retrieveInner = function(){
            if ((!Number(screenObj.display)) || (screenObj.display !== "0") || (screenObj.display !== ".")){
                this.updateVal(this.innerText);
            }};
        this.updateVal = function(val) {
            this.valArr = val;
            return this;
        }
    }
    let opObj = new Operation();
    console.log(opObj.updateVal())

    //Sends inputs to screenObj.display when calculator buttons are pressed
    function SendInputs(){
    }
    let sendInputObj = new SendInputs();

    //Object for returning the innerText values of elements it's attached to
    function ReturnInnerText(){ 
        this.method = function(){
            screenObj.updateDisplay(this.innerText);
        }
    }
    let innerTextVal = new ReturnInnerText();

    //Attaches obj to display values to screen to calc btns
    function addBtnListeners(){
        for(let elem of btnElemArr){
            if(elem.innerText !== "=") {
                elem.addEventListener("click", innerTextVal.method)
            };
        };
    };
    addBtnListeners();

    //Attaches obj to retrieve innertext to op calc btns
    function addOpBtnListeners(){
        for(let elem of opBtnElemArr){
            
        };
    };
    addOpBtnListeners();

    console.log(innerTextVal.method)
}



let calcObj = new CreateCalcObj();
console.log(calcObj);

