import { DistanceGrid, AldousBroder } from "../main";
import { cloneDeep } from "lodash";
import { Canvas, createCanvas } from "canvas";
import Cell from "../../types/cell";
//@ts-expect-error
const canvas: Canvas = document.getElementById("maze");
document.getElementById("start").onclick = gen;
document.getElementById("save").onclick = save;

document.getElementById("width").oninput = gen;
document.getElementById("height").oninput = gen;
document.getElementById("themetoggle").onclick = toggleTheme;
let theme = "light";
//@ts-ignore
let prevWidth = document.getElementById("width").value;
//@ts-ignore
let prevHeight = document.getElementById("height").value;
let grid: DistanceGrid, start: Cell, goal: Cell;
gen();
function gen() {
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
  prevHeight = height;
  prevWidth = width;
  grid = new DistanceGrid(height, width);

  AldousBroder.on(grid);
  start = grid.randCell();
  goal = grid.randCell();
  start.distances();
  grid.setPath(goal);
  //@ts-ignore
  grid.toCanvas(
    20,
    4,
    canvas,
    (cell) => {
      if (cell === start) {
        return "Chartreuse";
      }
      if (cell === goal) {
        return "BlueViolet";
      }
      if (grid.path.includes(cell)) {
        return "aquamarine";
      }
      return theme === "dark" ? "black" : "white";
    },
    theme === "dark" ? "white" : "black"
  );
}
function save() {
  var link = document.createElement("a");
  link.href = grid
    .toCanvas(
      20,
      4,
      createCanvas(1, 1),
      (cell) => {
        if (cell === start) {
          return "Chartreuse";
        }
        if (cell === goal) {
          return "BlueViolet";
        }
        if (grid.path.includes(cell)) {
          return "aquamarine";
        }
        return "white";
      },
      "black"
    )
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
          .getElementById("footer")
          .setAttribute(
            "class",
            "bg-dark text-center text-lg-start navbar fixed-bottom"
          );
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
        document
          .getElementById("footer")
          .setAttribute(
            "class",
            "bg-light text-center text-lg-start navbar fixed-bottom"
          );
        document.getElementById("dark-theme-style").setAttribute("href", "");
      }
      grid.toCanvas(
        20,
        4,
        canvas,
        (cell) => {
          if (cell === start) {
            return "Chartreuse";
          }
          if (cell === goal) {
            return "BlueViolet";
          }
          if (grid.path.includes(cell)) {
            return "aquamarine";
          }
          return theme === "dark" ? "black" : "white";
        },
        theme === "dark" ? "white" : "black"
      );
    }
  );
}
// toggleTheme();
