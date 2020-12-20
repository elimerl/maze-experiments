import BinaryTree from "./binarytree";
import Grid from "./grid";
const maze = new Grid(10, 10);
BinaryTree.on(maze);
const dataurl = maze.toCanvas(50).toDataURL();
document.getElementById("maze").setAttribute("src", dataurl);
