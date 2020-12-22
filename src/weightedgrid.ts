import Grid from "./grid";
import WeightedCell from "./weightedcell";

class WeightedGrid extends Grid {
  prepGrid() {
    const rows = new Array(this.rows);
    for (let i = 0; i < rows.length; i++) {
      rows[i] = new Array(this.columns);
      for (let j = 0; j < rows[i].length; j++) {
        rows[i][j] = new WeightedCell(i, j, 1);
      }
    }
    return rows;
  }
}
export default WeightedGrid;
