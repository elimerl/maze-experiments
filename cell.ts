class Cell {
  row: number;
  column: number;
  links: Cell[];
  north: Cell | null;
  south: Cell | null;
  east: Cell | null;
  west: Cell | null;
  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.links = [];
  }
  link(cell: Cell, bidi = true) {
    this.links.push(cell);
    if (bidi) cell.link(this, false);
    return this;
  }
  unlink(cell: Cell, bidi = true) {
    const index = this.links.indexOf(cell);
    if (index === -1) {
      throw new Error("Could not find cell");
    }
    this.links.splice(index, 1);
  }
  linked(cell: Cell) {
    return this.links.indexOf(cell) !== -1;
  }
  setNeighbors(north: Cell, south: Cell, east: Cell, west: Cell) {
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  }
}
export default Cell;
