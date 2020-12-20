import DistanceGrid from "./distancegrid";
import AldousBroder from "./aldousbroder";
import { createWriteStream, writeFileSync } from "fs";
const grid = new DistanceGrid(20, 20);
AldousBroder.on(grid, (grid, iterations, current) => {
  writeFileSync(
    `anim/maze-${iterations}.png`,
    grid
      .toCanvas(10, 2, (cell) => {
        if (cell === current) {
          return "#ff0000";
        } else {
          return null;
        }
      })
      .toBuffer()
  );
});

// const start = grid.getCell(
//   Math.floor(Math.random() * grid.rows),
//   Math.floor(Math.random() * grid.columns)
// );
// start.distances();
// const goal = grid.getCell(
//   Math.floor(Math.random() * grid.rows),
//   Math.floor(Math.random() * grid.columns)
// );
// grid.setPath(goal);
