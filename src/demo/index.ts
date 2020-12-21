import { DistanceGrid, AldousBroder } from "../main";
import { cloneDeep } from "lodash";
import { Canvas } from "canvas";
//@ts-expect-error
const canvas: Canvas = document.getElementById("maze");
document.getElementById("start").onclick = gen;
document.getElementById("save").onclick = save;

document.getElementById("width").oninput = gen;
document.getElementById("height").oninput = gen;
//@ts-ignore
let prevWidth = document.getElementById("width").value;
//@ts-ignore

let prevHeight = document.getElementById("height").value;
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
    //@ts-ignore

    document.getElementById("height").value = prevHeight;
    //@ts-ignore
    alertify.notify("Invalid height! Height must be between 1-75.", "error");
    document.getElementById("height").setAttribute("class", "shake");
    document.getElementById("height").onanimationend = () => {
      document.getElementById("height").setAttribute("class", "");
    };
    return;
  }
  prevHeight = height;
  prevWidth = width;
  const grid = new DistanceGrid(height, width);

  AldousBroder.on(grid);

  //@ts-ignore
  grid.toCanvas(20, 4, canvas);
}
function save() {
  var link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "maze.png";
  link.click();
}
