class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.nodes.add(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of vertex.adjacent) {
      node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const arrayOfVals = [start.value];

    function recursiveDFS(start, seen = new Set([start])) {
      for (let neighbor of start.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          arrayOfVals.push(neighbor.value);
          recursiveDFS(neighbor, seen)
        }
      }
    }

    recursiveDFS(start);
    return arrayOfVals;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const arrayOfVals = [start.value];
    const toVisitQueue = [start];
    const seen = new Set(toVisitQueue);

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          arrayOfVals.push(neighbor.value);
          toVisitQueue.push(neighbor);
        }
      }
    }
    return arrayOfVals;
  }
}

module.exports = {Graph, Node}