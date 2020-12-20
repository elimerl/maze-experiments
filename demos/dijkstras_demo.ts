import DistanceGrid from "../src/distancegrid";
import BinaryTree from "../src/binarytree";
import { createWriteStream } from "fs";
const grid = new DistanceGrid(8, 8);
BinaryTree.on(grid);
grid
  .getCell(
    Math.floor(Math.random() * grid.rows),
    Math.floor(Math.random() * grid.columns)
  )
  .distances();
console.clear();
console.log(
  grid.showPath(
    grid.pathTo(
      grid.getCell(
        Math.floor(Math.random() * grid.rows),
        Math.floor(Math.random() * grid.columns)
      )
    )
  )
);
grid.toCanvas(50, 10).createPNGStream().pipe(createWriteStream("maze.png"));
