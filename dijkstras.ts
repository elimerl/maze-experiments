import Cell from "./cell";

class Distances {
  root: Cell;
  cells: Cell[];
  constructor(root: Cell) {
    root.setDistance(0);
    this.root = root;
    this.cells = [];
    this.cells.push(this.root);
  }
  getCell(cell) {
    return this.cells.find((c) => c === cell);
  }
}
export default Distances;
