function addDiv(gridPerSide){

    // Total space limit = 960px x 960px
    // 10 X 10 => a grid size = 96px X 96px
    // 16 X 16 => a grid size = 60px X 60px
    // Need to change grid size accordingly

    // calculate div's width and height so that they will fit to 960px container
    const bordersInPixels = 2;
    let newSideLength = 960/gridPerSide - bordersInPixels;

    // create a new div element
    const newDiv = document.createElement("div");

    // set grid class to a grid
    newDiv.setAttribute('class','grid');

    // set width and height to a grid
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

function addDivs(gridPerSide){

    for(let i=0;i<gridPerSide*gridPerSide;i++){
        addDiv(gridPerSide);
    }
}

addDivs(16);

let allGrids = document.querySelectorAll(".grid"); // Collect all grids

// Set mouseover and mouseout eventlisteners to all grids.
for(i=0; i<allGrids.length; i++)
{ 
  allGrids[i].addEventListener("mouseover",mouseOver);
  allGrids[i].addEventListener("mouseout",mouseOut);
}

function mouseOver(event) {
    event.target.setAttribute('class','highlightGrid');
}

function mouseOut(event) {
    event.target.classList.remove('highlightGrid');
    event.target.setAttribute('class','grid'); 
}

function changeResolution(){

    let squaresPerSide = prompt("Please enter the number of squares per side for the new grid", "10");

    if (squaresPerSide > 0 && squaresPerSide <= 100) {
        removeGrid();
        addDivs(squaresPerSide);
    }else{
        alert("Wrong input! Try again!");
    }
}

function removeGrid(){
    // Remove all previous game results from the page.
    let gridItems = document.getElementsByClassName("grid");
        for(let i = gridItems.length - 1; 0 <= i; i--)
            if(gridItems[i] && gridItems[i].parentElement){
                gridItems[i].parentElement.removeChild(gridItems[i]);
            }
}

const changeButton = document.querySelector('#changeBtn');
changeButton.addEventListener('click', changeResolution); 



