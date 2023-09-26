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

 /* let elements = document.querySelectorAll('.grid');
    for(var i=0; i<elements.length; i++){
        elements[i].style.width = 18 + "px";
        elements[i].style.height = 18 + "px";
    }
*/
}

function addDivs(gridPerSide){

    for(let i=0;i<gridPerSide*gridPerSide;i++){
        addDiv(gridPerSide);
    }
}

addDivs(16);




