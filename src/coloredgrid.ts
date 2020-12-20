import Cell from "./cell";
import DistanceGrid from "./distancegrid";

class ColoredGrid extends DistanceGrid {
  bgColor(cell: Cell) {
    const distance = cell.distance;
    if (!distance) return null;
    const intensity = (this.getFurthest() - distance) / this.getFurthest();
    const dark = Math.round(255 * intensity);
    const bright = 128 + Math.round(127 * intensity);
    return `rgb(${dark}, ${bright}, ${dark})`;
  }
}
export default ColoredGrid;
