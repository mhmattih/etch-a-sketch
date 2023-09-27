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
    event.target.classList.add('highlightSquare');  
}

function mouseClicked(event){
    event.target.classList.add('highlightSquare');  
}

function mouseDblClicked(event){
    event.target.classList.remove('highlightSquare');
}

function mouseOver(event) {
    if (event.buttons === 1)
        event.target.classList.add('highlightSquare');  
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
}

function removeGrid(){
    // Remove existing grid
    let squareItems = document.getElementsByClassName("square");
        for(let i = squareItems.length - 1; 0 <= i; i--)
            if(squareItems[i] && squareItems[i].parentElement){
                squareItems[i].parentElement.removeChild(squareItems[i]);
            }
}

const changeButton = document.querySelector('#changeBtn');
changeButton.addEventListener('click', changeResolution); 

addSquares(16); // Let's start with 16X16 square grid

