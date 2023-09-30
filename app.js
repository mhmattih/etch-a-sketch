
let currentSquaresPerSide = 10; // Default value to start with
let eraserMode = false;
let funnyMode = false;
let darkeningMode = false;
let counterDarkened = 0;
let lastRed;
let lastGreen;
let lastBlue;
let isMouseDown = false;


// To add a single square
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

// To add squares to a grid and assign eventlisteners.
function addSquares(squaresPerSide){

    for(let i=0;i<squaresPerSide*squaresPerSide;i++){
        addSquare(squaresPerSide);
    }
    addSquareEventListeners();
}

function addSquareEventListeners(){

    let allSquares = document.querySelectorAll(".square"); // Collect all squares

    // Set eventlisteners to all squares.
    for(i=0; i<allSquares.length; i++)
    { 
        allSquares[i].addEventListener("mouseup",mouseUp);
        allSquares[i].addEventListener("mouseover",mouseOver);
        allSquares[i].addEventListener("mousedown",mouseDown);
        allSquares[i].addEventListener("mouseout",mouseOut);
        allSquares[i].addEventListener("click",mouseClicked); 
        allSquares[i].addEventListener("dblclick",mouseDblClicked);
    }
}

function mouseUp(event){

    if (isMouseDown && event.button === 0) {
        // Code to be executed when the left mouse button is released
        // This is needed for darkening feature, to set darkening 0 when left click is released
        counterDarkened = 0;
    }
    // Reset the flag when the mouse button is released
    isMouseDown = false;
}

// This triggered when mouse button is clicked but not released
function mouseDown(event){

        event.preventDefault();  // Prevent default browser action for click event. Without this selecting square did not work, cursor changed to fist.
        // This hightlights the first element where button is pressed.
        if (eraserMode == false){
            event.target.classList.add('highlightSquare');
            if (funnyMode == true && darkeningMode == false){
                setCurrentcolor(getRandomRGBColor(),event);
            } else if (funnyMode == true && darkeningMode == true){
                setCurrentcolor(getRandomRGBColor(),event);
                setCurrentcolor(convertColorDarker(event),event);
            } else if(funnyMode == false && darkeningMode == true){
                setCurrentcolor(convertColorDarker(event),event);
            }
        }
        // This erases the first element where button is pressed.
        if (event.button === 0 && eraserMode == true) {
            event.target.classList.remove('highlightSquare');
            setCurrentcolor("",event);  // Erase also funny colors =)
            counterDarkened = 0;        
        }
        // Set the flag when the left mouse button is pressed
        if (event.button === 0)
            isMouseDown = true;
}

// This triggered when mouse button is clicked and released
function mouseClicked(event){

    if (darkeningMode == 1){    
        counterDarkened = 0;
    }
}

// This is triggered when mouse button is double clicked and it erases the color
function mouseDblClicked(event){

    event.target.classList.remove('highlightSquare');
    setCurrentcolor("",event);// Erase also funny colors =)
}

// This triggered when mouse button is over the element
function mouseOver(event) {

    // event.buttons === 1 means if left button is down.
    if (event.buttons === 1 && eraserMode == false){
        event.target.classList.add('highlightSquare');
        if (funnyMode == true && darkeningMode == false){
            setCurrentcolor(getRandomRGBColor(),event);
        }else if (darkeningMode == true){ 
            setCurrentcolor(convertColorDarker(event),event);
        }   
    }
    else if (event.buttons === 1 && eraserMode == true){
        event.target.classList.remove('highlightSquare'); 
        setCurrentcolor("",event); // Erase also funny colors =)
    }
        
}

// With this function its possible to disable drawing ability.
// This is disabled
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

function getRandomRedColor() {
    return randomRed = Math.floor(Math.random() * 256);
}

function getRandomGreenColor() {
    return randomGreen = Math.floor(Math.random() * 256);
}

function getRandomBlueColor() {
    return randomBlue = Math.floor(Math.random() * 256);
}

function getRandomRGBColor(){
    return `rgb(${getRandomRedColor()}, ${getRandomGreenColor()}, ${getRandomBlueColor()})`;
}

function getCurrentColor(event){
    return event.target.style.backgroundColor;
}

function setCurrentcolor(color,event){
    event.target.style.backgroundColor = color;
}

function convertColorDarker(event){
    counterDarkened++;
 
    // this one starts in the first square where darkening is started
    if (counterDarkened == 1){
        
        const currentColor = getCurrentColor(event);
        const currentRBGValues = currentColor.match(/\d+/g);
        let currentRed;
        let currentGreen; 
        let currentBlue;

        // If current values are null make it white
        if (currentRBGValues == null){
            currentRed = 255;
            currentGreen = 255;
            currentBlue = 255;
            lastRed = currentRed;
            lastGreen = currentGreen;
            lastBlue = currentBlue;
        } else{
            currentRed = parseInt(currentRBGValues[0], 10);
            currentGreen = parseInt(currentRBGValues[1], 10);
            currentBlue = parseInt(currentRBGValues[2], 10);
            lastRed = currentRed;
            lastGreen = currentGreen;
            lastBlue = currentBlue;
        }
    } 
    let darkerRed = 0;
    let darkerGreen = 0;
    let darkerBlue = 0;
    
    // 1. round 90% --> values * 0.9 --> counterDarkened 1 (0.1)
    // 2. round 80% --> values * 0.8 --> counterDarkened 2 (0.2)
    // 3. round 70% --> values * 0.7 --> counterDarkened 3 (0.3)
    // 10. round 0% --> values * 0 --> counterDarkened 10 (1)
    // Darken the color by reducing each RGB component by 10%
    if(counterDarkened >= 1 && counterDarkened < 10){
        darkerRed = Math.round(lastRed * (1-(counterDarkened/10)));
        darkerGreen = Math.round(lastGreen * (1-(counterDarkened/10)));
        darkerBlue = Math.round(lastBlue * (1-(counterDarkened/10)));    
        return `rgb(${darkerRed}, ${darkerGreen}, ${darkerBlue})`;   
    }
    else{ // After ten darkening rounds return black colors
        lastRed = 0;
        lastGreen = 0;
        lastBlue = 0;
        return `rgb(${0}, ${0}, ${0})`;   
    }
   
}

function setFunnyMode(){
    if (funnyMode === false){
        funnyMode = true;
    }
    else{
        funnyMode = false;
    }
    counterDarkened = 0;
}

function setDarkeningMode(){
    if (darkeningMode === false){
        darkeningMode = true;
    }
    else{
        darkeningMode = false;
    }
    counterDarkened = 0;
}

function setEraserMode(){
    if (eraserMode === false){
        eraserMode = true;
    }
    else{
        eraserMode = false;
    }
    counterDarkened = 0;
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

