import { WeightedGrid, WeightedCell, AldousBroder } from "../src/main";

const maze = new WeightedGrid(4, 4);
AldousBroder.on(maze);
console.log(maze.toString());
