let globalTree = [
  {
    label: "A",
    children: ["B", "C"],
    parent: undefined,
    rank: undefined,
    ancestor: undefined,
    color: "white",
  },
  {
    label: "B",
    children: [],
    parent: undefined,
    rank: undefined,
    ancestor: undefined,
    color: "white",
  },
  {
    label: "C",
    children: ["D", "E"],
    parent: undefined,
    rank: undefined,
    ancestor: undefined,
    color: "white",
  },
  {
    label: "D",
    children: [],
    parent: undefined,
    rank: undefined,
    ancestor: undefined,
    color: "white",
  },
  {
    label: "E",
    children: [],
    parent: undefined,
    rank: undefined,
    ancestor: undefined,
    color: "white",
  },
];

let lowestCommonAncestorsState = {};

function MakeSet(tree, x) {
  // console.log(`MakeSet: ${x}`);

  const xIndex = tree.findIndex((node) => node.label === x);

  tree[xIndex].parent = xIndex;
  tree[xIndex].rank = 1;
}

function Find(tree, x) {
  // console.log(`Find: ${x}`);

  const xIndex = tree.findIndex((node) => node.label === x);

  if (tree[xIndex].parent !== xIndex) {
    tree[xIndex].parent = Find(tree, tree[tree[xIndex].parent].label);
  }

  return tree[xIndex].parent;
}

function Union(tree, x, y) {
  // console.log(`Union: ${x}, ${y}`);

  const xRoot = Find(tree, x);
  const yRoot = Find(tree, y);

  if (tree[xRoot].rank > tree[yRoot].rank) {
    tree[yRoot].parent = xRoot;
  } else if (tree[xRoot].rank < tree[yRoot].rank) {
    tree[xRoot].parent = yRoot;
  } else if (tree[xRoot].rank === tree[yRoot].rank) {
    tree[yRoot].parent = xRoot;
    tree[xRoot].rank = tree[xRoot].rank + 1;
  }
}

function TarjanOLCA(tree, currentNode, setState) {
  console.log("=====");
  console.log(`-> node: ${currentNode}`);

  const currentNodeIndex = tree.findIndex((node) => node.label === currentNode);

  MakeSet(tree, currentNode);
  tree[currentNodeIndex].ancestor = currentNodeIndex;

  for (let v of tree[currentNodeIndex].children) {
    TarjanOLCA(tree, v);
    Union(tree, currentNode, v);
    tree[Find(tree, currentNode)].ancestor = currentNodeIndex;
  }

  tree[currentNodeIndex].color = "black";
  console.log(`: ${currentNode} foi colorido de preto`);

  for (let v of tree) {
    if (v.color === "black") {
      let nodeOne = tree[currentNodeIndex].label;
      let nodeTwo = v.label;
      let lowestCommonAncestors =
        tree[tree[Find(tree, v.label)].ancestor].label;

      if (setState) {
        lowestCommonAncestorsState[`${nodeOne}_${nodeTwo}`] =
          lowestCommonAncestors;

        setState(lowestCommonAncestorsState);
      }

      console.log(
        `=> Menor ancestral comum de ${nodeOne} e ${nodeTwo} é ${lowestCommonAncestors}.`
      );
    }
  }
}

console.log("# Tarjan's off-line lowest common ancestors algorithm #\n");
TarjanOLCA(globalTree, "A");

// console.log("\n\n# Resultado do state #\n");
// console.log(globalTree);

export default TarjanOLCA;
