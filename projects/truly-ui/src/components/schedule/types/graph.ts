export class Graph {
  clusters = [];
  nodes = {};
}

export class Cluster {
  nodes = {};
  width = 0;
  maxCliqueSize = 1;
}

export class Node {
  id = '';
  start = 0;
  end = 0;
  neighbours = {};
  cluster = null;
  position = null;
  biggestCliqueSize = 1;

  constructor(id, start, end) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.neighbours = {};
    this.cluster = null;
    this.position = null;
    this.biggestCliqueSize = 1;
  }
}
