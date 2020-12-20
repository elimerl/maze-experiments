/**
 * Generate a maze using Binary Tree and show it as ASCII art.
 */
import Grid from "../grid";
import BinaryTree from "../binarytree";
import { createWriteStream } from "fs";
const maze = new Grid(10, 10);
BinaryTree.on(maze);
// show ascii
console.log(maze.toString());
