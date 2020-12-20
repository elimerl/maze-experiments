import { createCanvas, CanvasRenderingContext2D } from "canvas";
import Cell from "./cell";

class Grid {
  rows: number;
  columns: number;
  data: Cell[][];
  size: number;
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.data = this.prepGrid();
    this.confCells();
    this.size = rows * columns;
  }
  getCell(row, column) {
    try {
      return this.data[row][column];
    } catch (error) {
      return null;
    }
  }
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
  toString() {
    let output = "+" + "---+".repeat(this.columns) + "\n";
    this.data.forEach((row) => {
      let top = "|";
      let bottom = "+";
      row.forEach((cell) => {
        let body = "   ";
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
  toCanvas(cellSize = 20) {
    const imgWidth = cellSize * this.columns;
    const imgHeight = cellSize * this.rows;
    const canvas = createCanvas(imgWidth, imgHeight);
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
        if (!cell.north) lineTo(x1, y1, x2, y1, wall, 4);
        if (!cell.west) lineTo(x1, y1, x1, y2, wall, 4);
        if (!cell.linked(cell.east)) lineTo(x2, y1, x2, y2, wall, 4);
        if (!cell.linked(cell.south)) lineTo(x1, y2, x2, y2, wall, 4);
      });
    });
    return canvas;
  }
}
function line(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width?: number
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
export default Grid;
