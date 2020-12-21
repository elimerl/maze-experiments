import { DistanceGrid, AldousBroder } from "../main";
import { cloneDeep } from "lodash";
import { Canvas, createCanvas } from "canvas";
import Cell from "../../types/cell";
//@ts-expect-error
const canvas: Canvas = document.getElementById("maze");
document.getElementById("start").onclick = gen;
document.getElementById("save").onclick = save;

document.getElementById("width").oninput = check;
document.getElementById("height").oninput = check;

document.getElementById("themetoggle").onclick = toggleTheme;
document.getElementById("solution").onchange = () => {
  grid.toCanvas({
    cellSize: 50,
    lineWidth: 4,
    bgColor: bgcolor,
    canvas,
    //@ts-ignore
    numbered: document.getElementById("numbers").checked,
    lineColor: theme === "dark" ? "white" : "black",
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
    lineColor: theme === "dark" ? "white" : "black",
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
    lineColor: theme === "dark" ? "white" : "black",
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
      lineColor: theme === "dark" ? "white" : "black",
    })
    .toDataURL();
  link.download = "maze.png";
  link.click();
}
function toggleTheme() {
  jQuery("body").animate(
    {
      backgroundColor: theme === "light" ? "#060606" : "#fff",
    },
    200,
    () => {
      if (theme === "light") {
        theme = "dark";

        document
          .getElementById("themetoggle")
          .setAttribute("class", "btn btn-light");
        document
          .getElementById("themetoggle")
          .setAttribute(
            "style",
            `color: #000; background-color: #f8f9fa; border-color: #f8f9fa;`
          );
        document.getElementById("themetoggle").innerHTML =
          "Switch to Light Theme";

        document
          .getElementById("dark-theme-style")
          .setAttribute(
            "href",
            "https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/cyborg/bootstrap.min.css"
          );
      } else {
        theme = "light";
        document
          .getElementById("themetoggle")
          .setAttribute("class", "btn btn-dark");
        document.getElementById("themetoggle").innerHTML =
          "Switch to Dark Theme";

        document.getElementById("dark-theme-style").setAttribute("href", "");
      }
      grid.toCanvas({
        cellSize: 50,
        lineWidth: 4,
        bgColor: bgcolor,
        //@ts-ignore
        numbered: document.getElementById("numbers").checked,
        lineColor: theme === "dark" ? "white" : "black",
        canvas,
      });
    }
  );
}
// toggleTheme();
const bgcolor = (cell) => {
  if (cell === start) {
    return "Chartreuse";
  }
  if (cell === goal) {
    return "BlueViolet";
  }
  //@ts-ignore
  if (document.getElementById("solution").checked) {
    if (grid.path.includes(cell)) {
      return "aquamarine";
    }
  }

  return theme === "dark" ? "black" : "white";
};
function check() {
  //@ts-ignore

  const width = parseInt(document.getElementById("width").value);
  //@ts-ignore

  const height = parseInt(document.getElementById("height").value);
  if (width > 75) {
    //@ts-ignore

    document.getElementById("width").value = prevWidth;
    //@ts-ignore
    alertify.notify("Invalid width! Width must be between 1-75.", "error");
    document.getElementById("width").setAttribute("class", "shake");
    document.getElementById("width").onanimationend = () => {
      document.getElementById("width").setAttribute("class", "");
    };

    return;
  }
  if (height > 75) {
    // @ts-ignore
    document.getElementById("height").value = prevHeight;
    // @ts-ignore
    alertify.notify("Invalid height! Height must be between 1-75.", "error", 1);
    document.getElementById("height").setAttribute("class", "shake");
    document.getElementById("height").onanimationend = () => {
      document.getElementById("height").setAttribute("class", "");
    };
    return;
  }
}
document.getElementById("start").click();
