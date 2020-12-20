/**
 * Generate a maze using Binary Tree and pathfind between two random cells.
 */
import DistanceGrid from "../distancegrid";
import BinaryTree from "../binarytree";
const grid = new DistanceGrid(8, 8);
BinaryTree.on(grid);
// set start and goal
const start = grid.randCell();
const goal = grid.randCell();
// run dijkstras with the start cell as the start
start.distances();
// show path to goal
console.log(grid.showPath(grid.setPath(goal)));
