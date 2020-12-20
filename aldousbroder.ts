import Grid from "./grid";
import * as _ from "lodash";
import Cell from "./cell";
/**
 * An implementation of [Aldous-Broder](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Aldous-Broder_algorithm).
 */
class AldousBroder {
  /**
   * Run Aldous-Broder on `grid`.
   * @param grid The grid to generate a maze on.
   */
  static on(
    grid: Grid,
    cb?: (grid: Grid, iterations: number, current: Cell) => void
  ) {
    let current = grid.getCell(0, 0);
    let unvisited = grid.size - 1;
    let iterations = 0;
    while (unvisited > 0) {
      if (cb) cb(grid, iterations, current);
      const neighbor = _.sample(current.neighbors());
      if (neighbor.links.length === 0) {
        current.link(neighbor);
        unvisited--;
      }
      current = neighbor;
      iterations++;
    }
    return grid;
  }
}
export default AldousBroder;
