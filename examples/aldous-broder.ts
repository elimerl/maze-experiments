/**
 * Generate a maze using Aldous-Broder's.
 */
import { AldousBroder, Grid } from "../lib/main";
import { createWriteStream } from "fs";
const maze = new Grid(10, 10);
AldousBroder.on(maze);
// write to png
maze
  .toCanvas()
  .createPNGStream()
  .pipe(createWriteStream(__dirname + "/maze.png"));
