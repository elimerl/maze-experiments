import Cell from "./cell";
import Distances from "./dijkstras";

class WeightedCell extends Cell {
  weight: number;
  links: WeightedCell[];
  setWeight(weight: number) {
    this.weight = weight;
  }
  constructor(row: number, column: number, weight: number) {
    super(row, column);
    this.setWeight(weight);
  }
  /**
   * Run Dijkstra's algorithm on this cell.
   */
  distances() {
    const distances = new Distances(this);
    let frontier: WeightedCell[] = [this];
    while (frontier.length > 0) {
      const new_frontier = [];
      frontier.forEach((cell) => {
        for (let i = 0; i < cell.links.length; i++) {
          const linked = cell.links[i];
          if (distances.getCell(linked)) continue;
          linked.setDistance(distances.getCell(cell).distance + linked.weight);
          distances.cells.push(linked);
          new_frontier.push(linked);
        }
      });
      frontier = new_frontier;
    }
    return distances;
  }
}
export default WeightedCell;
