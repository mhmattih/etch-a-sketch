
let currentSquaresPerSide = 16; // Default value to start with
let eraserMode = false;
let funnyMode = false;

function addSquare(squaresPerSide){

    // Total space limit = 960px x 960px
    // 10 X 10 => a square size = 96px X 96px
    // 16 X 16 => a square size = 60px X 60px
    // Need to change square size accordingly

    // calculate div's width and height so that they will fit to 960px container
    const bordersInPixels = 2;
    let newSideLength = 960/squaresPerSide - bordersInPixels;

    // create a new div element
    const newDiv = document.createElement("div");

    // set square class to a square
    newDiv.setAttribute('class','square');

    // set width and height to a square
    newDiv.style.width = newSideLength+ "px";
    newDiv.style.height = newSideLength + "px";

    // and give it some content
    const newContent = document.createTextNode("");

    // add the text node to the newly created div
    newDiv.appendChild(newContent);
 
    // add the newly created element and its content into the DOM
    const gridContainer = document.getElementById("gridContainer");
    gridContainer.appendChild(newDiv);

}

function addSquares(squaresPerSide){

    for(let i=0;i<squaresPerSide*squaresPerSide;i++){
        addSquare(squaresPerSide);
    }
    addSquareEventListeners();
}

function addSquareEventListeners(){

    let allSquares = document.querySelectorAll(".square"); // Collect all squares

    // Set mouseover, mouseout, click and mousedown eventlisteners to all squares.
    for(i=0; i<allSquares.length; i++)
    { 
        allSquares[i].addEventListener("mouseover",mouseOver);
        allSquares[i].addEventListener("mouseout",mouseOut);
        allSquares[i].addEventListener("click",mouseClicked);
        allSquares[i].addEventListener("mousedown",mouseDown);
        allSquares[i].addEventListener("dblclick",mouseDblClicked);
    }
}

function mouseDown(event){

        event.preventDefault();  // Prevent default browser action for click event. Without this selecting square did not work, cursor changed to fist.
        // This hightlights the first element where button is pressed.
        if (eraserMode == false){
            event.target.classList.add('highlightSquare');
            if (funnyMode == true)
            event.target.style.backgroundColor = getRGBColor();
        }
        // This erases the first element where button is pressed.
        if (event.button === 0 && eraserMode == true) {
            event.target.classList.remove('highlightSquare'); 
        }
}

function mouseClicked(event){
    
    if (eraserMode == false){
        event.target.classList.add('highlightSquare');
        if (funnyMode == true)
            event.target.style.backgroundColor = getRGBColor();
    }
    else
        event.target.classList.remove('highlightSquare'); 
}

function mouseDblClicked(event){
    event.target.classList.remove('highlightSquare');
}

function mouseOver(event) {

    if (event.buttons === 1 && eraserMode == false){
        event.target.classList.add('highlightSquare');
        if (funnyMode == true)
        event.target.style.backgroundColor = getRGBColor();
    }
    else if (event.buttons === 1 && eraserMode == true)
        event.target.classList.remove('highlightSquare'); 
}

function mouseOut(event) {
    //event.target.classList.remove('highlightSquare');
}

function changeResolution(){

    let squaresPerSide = prompt("Please enter the number of squares per side for the new grid (Between 1-100).", "10");

    if (squaresPerSide > 0 && squaresPerSide <= 100) {
        removeGrid();
        addSquares(squaresPerSide);
    }else{
        alert("Wrong input! Try again!");
    }
    currentSquaresPerSide = squaresPerSide;
}

function removeGrid(){
    // Remove existing grid
    let squareItems = document.getElementsByClassName("square");
        for(let i = squareItems.length - 1; 0 <= i; i--)
            if(squareItems[i] && squareItems[i].parentElement){
                squareItems[i].parentElement.removeChild(squareItems[i]);
            }
}

function clearGridView(){
    removeGrid();
    addSquares(currentSquaresPerSide);
}

function setFunnyMode(){

    if (funnyMode === false)
        funnyMode = true;
    else
        funnyMode = false;
}

function getRedColor() {
    return randomRed = Math.floor(Math.random() * 256);
}

function getGreenColor() {
    return randomGreen = Math.floor(Math.random() * 256);
}

function getBlueColor() {
    return randomBlue = Math.floor(Math.random() * 256);
}

function getRGBColor(){
    return `rgb(${getRedColor()}, ${getGreenColor()}, ${getBlueColor()})`;
}


function setDarkeningMode(){
    console.log("Darkening mode change");
}

function setEraserMode(){

    if (eraserMode === false)
        eraserMode = true;
    else
        eraserMode = false;

}

const changeButton = document.querySelector('#changeBtn');
changeButton.addEventListener('click', changeResolution); 

const clearButton = document.querySelector('#clearBtn');
clearButton.addEventListener('click', clearGridView); 

const funnySwitch = document.querySelector('#funnySwitchInput');
funnySwitch.addEventListener('change', setFunnyMode);

const darkSwitch = document.querySelector('#darkSwitchInput');
darkSwitch.addEventListener('change', setDarkeningMode);

const eraseSwitch = document.querySelector('#eraseSwitchInput');
eraseSwitch.addEventListener('change', setEraserMode);

addSquares(currentSquaresPerSide); // Let's start with 16X16 square grid

