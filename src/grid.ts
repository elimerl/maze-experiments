import { createCanvas, CanvasRenderingContext2D, Canvas } from "canvas";
import Cell from "./cell";
import Distances from "./dijkstras";
/**
 * A grid of {@link Cell}s.
 * @class
 */
class Grid {
  rows: number;
  columns: number;
  data: Cell[][];
  size: number;
  /**
   * Create a grid of {@link Cell}s.
   * @param rows The amount of rows the grid should have.
   * @param columns The amount of columns the grid should have.
   */
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.data = this.prepGrid();
    this.confCells();
    this.size = rows * columns;
  }
  /**
   * Get the cell at the specified position.
   * @param row The row the cell is in.
   * @param column The column the cell is in.
   * @returns The cell at the position, or null if the position is out of the grid range.
   */
  getCell(row: number, column: number) {
    try {
      return this.data[row][column];
    } catch (error) {
      return null;
    }
  }
  /**
   * Get a random cell in the grid.
   */
  randCell() {
    return this.getCell(
      Math.floor(Math.random() * this.rows),
      Math.floor(Math.random() * this.columns)
    );
  }
  /**
   * Get the cell at coordinates specified by a string.
   * @param coords The coordinates returned by
   * ```ts
   * Cell.getCoords()
   * ```
   * Example: '2,2' is {row: 2, column: 2}
   */
  getCellString(coords: string) {
    const row = coords.split(",")[0];
    const column = coords.split(",")[1];
    return this.getCell(parseInt(row), parseInt(column));
  }
  /**
   * Fill the grid with cells.
   * @returns The grid data.
   */
  prepGrid() {
    const rows = new Array(this.rows);
    for (let i = 0; i < rows.length; i++) {
      rows[i] = new Array(this.columns);
      for (let j = 0; j < rows[i].length; j++) {
        rows[i][j] = new Cell(i, j);
      }
    }
    return rows;
  }
  /**
   * Add the neighbors of each cell in the grid.
   */
  confCells() {
    this.data.forEach((row) => {
      row.forEach((cell) => {
        const { row, column } = cell;
        const north = this.getCell(row - 1, column);
        const south = this.getCell(row + 1, column);
        const east = this.getCell(row, column + 1);
        const west = this.getCell(row, column - 1);
        cell.setNeighbors(north, south, east, west);
      });
    });
  }
  contentsOf(cell: Cell) {
    return "   ";
  }
  /**
   * Convert the grid to an ASCII representation.
   */
  toString() {
    let output = "+" + "---+".repeat(this.columns) + "\n";
    this.data.forEach((row) => {
      let top = "|";
      let bottom = "+";
      row.forEach((cell) => {
        let body = this.contentsOf(cell);
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
  /**
   * Create a canvas from the grid.
   * @param cellSize The size of each cell in the image in pixels.
   * @param width The width of the lines.
   * @returns The rendered canvas.
   */
  toCanvas(
    cellSize = 20,
    width = 4,
    canvas = createCanvas(10, 10),
    bgColorArg?: (cell: Cell) => string | null
  ) {
    const bgColor = bgColorArg || this.bgColor;
    const imgWidth = cellSize * this.columns;
    const imgHeight = cellSize * this.rows;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext("2d");
    const lineTo = line.bind(null, ctx);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    this.data.forEach((row) => {
      row.forEach((cell) => {
        const x1 = cell.column * cellSize;
        const y1 = cell.row * cellSize;
        const x2 = (cell.column + 1) * cellSize;
        const y2 = (cell.row + 1) * cellSize;
        const wall = "black";
        ctx.fillStyle = bgColor(cell) || "white";
        ctx.fillRect(x1, y1, x2, y2);
        if (!cell.north) lineTo(x1, y1, x2, y1, wall, width);
        if (!cell.west) lineTo(x1, y1, x1, y2, wall, width);
        if (!cell.linked(cell.east)) lineTo(x2, y1, x2, y2, wall, width);
        if (!cell.linked(cell.south)) lineTo(x1, y2, x2, y2, wall, width);
      });
    });
    return canvas;
  }
  /**
   * Get the background color of a cell.
   * @param cell The cell to get a background color of.
   */
  bgColor(cell: Cell) {
    return null;
  }
}
/**
 * INTERNAL -- Draw a line from x1,y1 to x2,y2 with color and line width.
 * @example
 * ```typescript
 * const canvas = createCanvas(20,20)
 * const ctx = canvas.getContext('2d')
 *
 * const lineTo = line.bind(undefined, ctx)
 * lineTo(0,0,10,10) // Draw a line from '0,0' to '10,10'
 * ```
 * @param ctx The canvas rendering context. Recommended to bind this e.g.
 * ```ts
 * const ctx = getRenderingContextSomehow()
 * const lineTo = line.bind(undefined, ctx)
 * ```
 * @param x1 The source x.
 * @param y1 The source y.
 * @param x2 The destination x.
 * @param y2 The destination y.
 * @param color The color of the line.
 * @param width The width of the line.
 * @internal
 */
function line(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width = 1
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
export default Grid;
