/**
 * Generate a maze using Binary Tree and show it as a PNG.
 */
import Grid from "../grid";
import BinaryTree from "../binarytree";
import { createWriteStream } from "fs";
const maze = new Grid(10, 10);
BinaryTree.on(maze);
// write to png
maze
  .toCanvas()
  .createPNGStream()
  .pipe(createWriteStream(__dirname + "/maze.png"));
