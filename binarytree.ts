import Grid from "./grid";
import * as _ from "lodash";
/**
 * An implementation of [Binary Tree](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Simple_algorithms).
 */
class BinaryTree {
  /**
   * Run Binary Tree on `grid`.
   * @param grid The grid to generate a maze on.
   */
  static on(grid: Grid) {
    grid.data.forEach((row) => {
      row.forEach((cell) => {
        let neighbors = [];
        if (cell.north) neighbors.push(cell.north);
        if (cell.east) neighbors.push(cell.east);
        const neighbor = _.sample(neighbors);
        if (neighbor) cell.link(neighbor);
      });
    });
    return grid;
  }
}
export default BinaryTree;
