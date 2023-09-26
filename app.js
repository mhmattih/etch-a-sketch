function addDiv(){
    // create a new div element
    const newDiv = document.createElement("div");

    // and give it some content
    const newContent = document.createTextNode("DIV");

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM
    const gridContainer = document.getElementById("gridContainer");
    gridContainer.appendChild(newDiv);
}

function addDivs(amount){

    for(let i=0;i<amount;i++){
        addDiv(i);
    }
}

addDivs(10);
