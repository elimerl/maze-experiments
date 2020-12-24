import Distances from "./dijkstras";

/**
 * A cell in a {@link Grid}.
 * @class
 */
class Cell {
  /**
   * What row this cell is in.
   */
  row: number;
  /**
   * What column this cell is in.
   */
  column: number;
  /**
   * The cells this cell is linked to.
   */
  links: Cell[];
  /**
   * The neighbor to the north of this cell.
   */
  north: Cell | null;
  /**
   * The neighbor to the south of this cell.
   */
  south: Cell | null;
  /**
   * The neighbor to the east of this cell.
   */
  east: Cell | null;
  /**
   * The neighbor to the west of this cell.
   */
  west: Cell | null;
  /**
   * The distance of this cell to the root cell.
   */
  distance: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /**
   * Create a cell.
   * @constructor
   * @param row The row of the grid the cell is in.
   * @param column The column of the grid the cell is in.
   */
  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.links = [];
  }
  /**
   * Link this cell to another cell.
   * @param cell The cell to link this one to.
   * @param bidi Whether or not to link the other cell to this one. Don't change this most of the time.
   */
  link(cell: Cell, bidi = true) {
    this.links.push(cell);
    if (bidi) cell.link(this, false);
    return this;
  }
  /**
   * Unlink this cell from another cell.
   * @param cell The cell to unlink from.
   * @param bidi Whether or not to unlink the other cell to this one. Don't change this most of the time.
   * @throws When the cell is not in this cell's `links` array.
   */
  unlink(cell: Cell, bidi = true) {
    const index = this.links.indexOf(cell);
    if (index === -1) {
      throw new Error("Could not find cell");
    }
    this.links.splice(index, 1);
  }
  /**
   * Check whether this cell is linked to `cell`.
   * @param cell The cell to check if this one is linked to.
   */
  linked(cell: Cell) {
    return this.links.indexOf(cell) !== -1;
  }
  /**
   * INTERNAL -- Set the neighbors of this cell.
   * @param north The cell to the north of this cell.
   * @param south The cell to the south of this cell.
   * @param east The cell to the east of this cell.
   * @param west The cell to the west of this cell.
   */
  setNeighbors(north: Cell, south: Cell, east: Cell, west: Cell) {
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  }

  neighbors() {
    const neighbors: Cell[] = [];
    if (this.north) neighbors.push(this.north);
    if (this.south) neighbors.push(this.south);
    if (this.east) neighbors.push(this.east);
    if (this.west) neighbors.push(this.west);
    return neighbors;
  }

  /**
   * Get the coordinates of this cell as a string.
   */
  getCoords() {
    return `${this.row},${this.column}`;
  }
  /**
   * Set the distance of this cell to the root cell.
   * @param distance The distance to set it to.
   */
  setDistance(distance: number) {
    this.distance = distance;
  }
  /**
   * Run Dijkstra's algorithm on this cell.
   */
  distances() {
    const distances = new Distances(this);
    let frontier: Cell[] = [this];
    while (frontier.length > 0) {
      const new_frontier = [];
      frontier.forEach((cell) => {
        for (let i = 0; i < cell.links.length; i++) {
          const linked = cell.links[i];
          if (distances.getCell(linked)) continue;
          linked.setDistance(distances.getCell(cell).distance + 1);
          distances.cells.push(linked);
          new_frontier.push(linked);
        }
      });
      frontier = new_frontier;
    }
    return distances;
  }
  setPositionCanvas(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}
export default Cell;
