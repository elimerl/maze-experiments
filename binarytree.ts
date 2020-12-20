import Grid from "./grid";
import * as _ from "lodash";
class BinaryTree {
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
  }
}
export default BinaryTree;
