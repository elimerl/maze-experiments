import { DistanceGrid, AldousBroder, Cell } from "../main";
import { cloneDeep } from "lodash";
import { Canvas, createCanvas } from "canvas";
//@ts-expect-error
const canvas: Canvas = document.getElementById("maze");
const font = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
"Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
"Segoe UI Symbol;`;
document.getElementById("start").onclick = gen;
document.getElementById("save").onclick = save;

document.getElementById("width").oninput = check;
document.getElementById("height").oninput = check;

document.getElementById("solution").onchange = () => {
  grid.toCanvas({
    cellSize: 50,
    lineWidth: 4,
    bgColor: bgcolor,
    canvas,
    //@ts-ignore
    numbered: document.getElementById("numbers").checked,
    color: theme === "dark" ? "white" : "black",
    font,
  });
};
document.getElementById("numbers").onchange = () => {
  grid.toCanvas({
    cellSize: 50,
    lineWidth: 4,
    bgColor: bgcolor,
    canvas,
    //@ts-ignore

    numbered: document.getElementById("numbers").checked,
    color: theme === "dark" ? "white" : "black",
    font,
  });
};
let theme = "light";
//@ts-ignore
let prevWidth = document.getElementById("width").value;
//@ts-ignore
let prevHeight = document.getElementById("height").value;
let grid: DistanceGrid, start: Cell, goal: Cell;
function gen() {
  //@ts-ignore

  const width = parseInt(document.getElementById("width").value);
  //@ts-ignore

  const height = parseInt(document.getElementById("height").value);
  prevHeight = height;
  prevWidth = width;
  grid = new DistanceGrid(height, width);

  AldousBroder.on(grid);
  start = grid.randCell();
  goal = grid.randCell();
  start.distances();
  grid.setPath(goal);
  //@ts-ignore
  grid.toCanvas({
    cellSize: 50,
    lineWidth: 4,
    bgColor: bgcolor,
    canvas,
    //@ts-ignore
    numbered: document.getElementById("numbers").checked,
    color: theme === "dark" ? "white" : "black",
    font,
  });
}
function save() {
  var link = document.createElement("a");
  link.href = grid
    .toCanvas({
      cellSize: 50,
      lineWidth: 4,

      bgColor: bgcolor,
      //@ts-ignore
      numbered: document.getElementById("numbers").checked,
      color: theme === "dark" ? "white" : "black",
      font,
    })
    .toDataURL();
  link.download =
    "maze-" + new Date().getDay() + new Date().getHours() + ".png";
  link.click();
}

const bgcolor = (cell) => {
  if (cell === start) {
    return "#02bf35";
  }
  if (cell === goal) {
    return "#e3d400";
  }
  //@ts-ignore
  if (document.getElementById("solution").checked) {
    if (grid.path.includes(cell)) {
      return "#00e3bd";
    }
  }

  return theme === "dark" ? "black" : "white";
};
function check() {
  //@ts-ignore

  const width = parseInt(document.getElementById("width").value);
  //@ts-ignore

  const height = parseInt(document.getElementById("height").value);
  if (width > 60) {
    //@ts-ignore

    document.getElementById("width").value = prevWidth;
    //@ts-ignore
    alertify.notify("Invalid width! Width must be between 1-60.", "error");
    document.getElementById("width").setAttribute("class", "shake");
    document.getElementById("width").onanimationend = () => {
      document.getElementById("width").setAttribute("class", "");
    };

    return;
  }
  if (height > 60) {
    // @ts-ignore
    document.getElementById("height").value = prevHeight;
    // @ts-ignore
    alertify.notify("Invalid height! Height must be between 1-60.", "error", 1);
    document.getElementById("height").setAttribute("class", "shake");
    document.getElementById("height").onanimationend = () => {
      document.getElementById("height").setAttribute("class", "");
    };
    return;
  }
}
