/**
 * Generate a maze using Binary Tree and show it as ASCII art.
 */
import { Grid, BinaryTree } from "../lib/main";
import { createWriteStream } from "fs";
const maze = new Grid(10, 10);
BinaryTree.on(maze);
// show ascii
console.log(maze.toString());
