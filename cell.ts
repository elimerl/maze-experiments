/**
 * A cell in a {@link Grid}.
 * @class
 */
class Cell {
  row: number;
  column: number;
  links: Cell[];
  north: Cell | null;
  south: Cell | null;
  east: Cell | null;
  west: Cell | null;
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
}
export default Cell;
