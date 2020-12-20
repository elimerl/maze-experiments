import BinaryTree from "../src/binarytree";
import Grid from "../src/grid";
const maze = new Grid(10, 10);
BinaryTree.on(maze);
const dataurl = maze.toCanvas(50).toDataURL();
document.getElementById("maze").setAttribute("src", dataurl);
