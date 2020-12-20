<h1 align="center">Welcome to maze-experiments 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://choosealicense.com/licenses/mit/" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A collection of experiments with maze generation and solving.

## Install

```sh
yarn install
```

## Example

```typescript
import { createWriteStream } from "fs";
const maze = new Grid(10, 10);
BinaryTree.on(maze);
// show ascii
console.log(maze.toString());
// write to png
maze.toCanvas().createPNGStream().pipe(createWriteStream("maze.png"));
```

More in [examples](https://github.com/elimerl/maze-experiments/tree/master/examples/)

## Docs

The documentation is online at [https://elimerl.github.io/maze-experiments/](https://elimerl.github.io/maze-experiments/). For the latest version (in case I forgot to rebuild docs) clone the repository and run.

```sh
yarn build
```

## Author

👤 **elimerl**

- Github: [@elimerl](https://github.com/elimerl)

## 📝 License

Copyright © 2020 [elimerl](https://github.com/elimerl).<br />
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
