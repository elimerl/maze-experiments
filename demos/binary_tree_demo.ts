import Grid from "../src/grid";
import BinaryTree from "../src/binarytree";
import { createWriteStream } from "fs";
import * as open from "open";

const grid = new Grid(10, 10);
BinaryTree.on(grid);
grid
  .toCanvas(70)
  .createPNGStream()
  .pipe(createWriteStream("maze.png"))
  .on("finish", () => {
    open("maze.png");
  });
