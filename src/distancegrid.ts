import Cell from "./cell";
import Grid from "./grid";

class DistanceGrid extends Grid {
  path: Cell[];
  contentsOf(cell: Cell) {
    if (cell.distance.toString(36).length === 1) {
      return " " + cell.distance.toString(36) + " ";
    }
    if (cell.distance.toString(36).length === 2) {
      return " " + cell.distance.toString(36);
    }
    return cell.distance.toString(36);
  }
  pathTo(goal: Cell) {
    let current = goal;
    const path = [goal];
    while (current.distance !== 0) {
      const neighbor = current
        .neighbors()
        .find((c) => c.distance === current.distance - 1);
      if (!neighbor) {
        throw new Error("Could not find a path");
      }
      path.unshift(neighbor);
      current = neighbor;
    }
    return path;
  }
  /**
   * Get the farthest cell from the root cell.
   * Must have run Cell.distances() first.
   */
  getFurthest() {
    let largest = 0;
    this.data.forEach((row) => {
      row.forEach((cell) => {
        if (cell.distance > largest) largest = cell.distance;
      });
    });
    return largest;
  }
  /**
   * Similar to `toString`, but only fills the cells in the path.
   * @param path The path found by `pathTo`.
   */
  showPath(path: Cell[]) {
    let output = "+" + "---+".repeat(this.columns) + "\n";
    this.data.forEach((row) => {
      let top = "|";
      let bottom = "+";
      row.forEach((cell) => {
        let body = path.includes(cell) ? this.contentsOf(cell) : "   ";
        let east_boundary = cell.linked(cell.east) ? " " : "|";
        top += body + east_boundary;
        let south_boundary = cell.linked(cell.south) ? "   " : "---";
        let corner = "+";
        bottom += south_boundary + corner;
      });
      output += top + "\n";
      output += bottom + "\n";
    });
    return output;
  }
  setPath(goal: Cell) {
    this.path = this.pathTo(goal);
    return this.path;
  }
  bgColor(cell: Cell): string {
    if (this.path && this.path.includes(cell)) {
      if (this.path[0] === cell) {
        return "#fffa00";
      }
      if (this.path.slice(-1)[0] === cell) {
        return "#006aff";
      }
      return "#0ea300";
    } else {
      return null;
    }
  }
}
export default DistanceGrid;
