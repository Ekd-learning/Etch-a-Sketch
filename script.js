"use strict";
const grid_generator_btn = document.querySelector(`#grid_generator_btn`);
const grid_container = document.querySelector(`#grid_container`);
console.log(grid_container);

const validateNumber = function (num) {
  return !isNaN(num) && isFinite(num);
};

//[min, max]
const getRandomInt = function (min = 0, max = 255) {
  return Math.random() * (max - min) + min;
};
const getRandomRGB = function () {
  return `rgb(${getRandomInt()} ${getRandomInt()} ${getRandomInt()})`;
};
const setRandomColor = function (element) {
  if (element != null) {
    element.style.backgroundColor = getRandomRGB();
  }
};

const toggleElementBackground = function (element) {
  if (element != null && element != undefined) {
    if (element.style.backgroundColor != undefined) {
      if (element.style.backgroundColor === "white") {
        element.style.backgroundColor = "lightgray";
      } else {
        element.style.backgroundColor = "white";
      }
    }
  }
};

const clearGrid = function () {
  console.log("1", grid_container);
  document.querySelectorAll(`.square`).forEach((square) => square.remove());
  console.log("2", grid_container);
  document.querySelectorAll(`.grid-row`).forEach((row) => row.remove());
  console.log("3", grid_container);
};

const generateGrid = function (grid_number = 16) {
  const squareMaxHeight =
    (document.querySelector(`body`).offsetHeight * 0.8) / grid_number;
  for (let i = 0; i < grid_number; i++) {
    const row = document.createElement("div");
    row.classList.add("grid_row");
    for (let j = 0; j < grid_number; j++) {
      const square_div = document.createElement("div");
      square_div.classList.add("square");
      //setRandomColor(square_div); // testing purposes
      square_div.style.backgroundColor = "white";
      square_div.style.height = `${squareMaxHeight}px`;
      square_div.style.width = `${squareMaxHeight}px`;
      square_div.style.maxWidth = "960px";
      square_div.style.maxHeight = "960px";
      square_div.style.border = "1px solid black";
      square_div.appendChild(document.createElement("div"));
      square_div.addEventListener("mouseover", function () {
        toggleElementBackground(square_div);
      });
      row.appendChild(square_div);
    }
    grid_container.appendChild(row);
  }
};
generateGrid(16);
grid_generator_btn.addEventListener("click", function (e) {
  let gridSize;
  let create = true;
  while (true) {
    gridSize = +prompt("Enter grid size: (max is 100, 0 to exit)");
    if (validateNumber && (gridSize > 0) & (gridSize <= 100)) {
      break;
    } else if (validateNumber && gridSize === 0) {
      create = false;
      break;
    } else {
      alert("Invalid input! Try again!");
    }
  }
  if (create) {
    clearGrid();
    generateGrid(gridSize);
  }
});

// TO-DO NEXT TIME:
// 1. Make sure the size of grid container is fixed(unless window is resized). i.e. 4 squares must take as much space as 64
// 2. Randomize color of grids instead of colouring them gray (bonus. Almostg did it unknowingly lol)
// 3. Add progressive darkening effect (increase darkness by 10% with each interaction)
//    10 interactions => fully black square
