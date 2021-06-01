import { useState, Fragment } from "react";

import Button from "@material-ui/core/Button";
import Graph from "react-graph-vis";
import { pick } from "lodash";

import { Container, Aside, FormCreateGraph } from "./style";
import TarjanOLCA from "./utils/TarjanOLCA";

function App() {
  const [inputValues, setInputValues] = useState([
    { nodeKey: "node_0", nodeValue: "", linkKey: "link_0", linkValue: "" },
  ]);
  const [lowestCommonAncestors, setLowestCommonAncestors] = useState({});
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  const [resInputValues, setResInputValues] = useState([
    { n_one: "", n_one: "" },
  ]);

  const handleSubmitForm = () => {
    let currentTree = [];

    for (let index in inputValues) {
      if (inputValues[index].nodeValue) {
        currentTree.push({
          id: typeof index === "string" ? parseInt(index, 10) : index,
          label: inputValues[index].nodeValue || inputValues[index].nodeKey,
          children:
            inputValues[index]?.linkValue &&
            inputValues[index]?.linkValue.length > 0
              ? (inputValues[index].linkValue || "")
                  .replaceAll(" ", "")
                  .split(",")
              : [],
          parent: undefined,
          rank: undefined,
          ancestor: undefined,
          color: "white",
        });
      }
    }

    // Dsenha Grafo
    let currentGraph = {
      nodes: currentTree.map((node) => pick(node, ["id", "label"])),
      edges: [],
    };
    for (let node of currentTree || []) {
      // console.log("node: ", node);
      for (let children of node?.children || []) {
        // console.log("children: ", children);
        currentGraph.edges.push({
          from: node.id,
          to: currentTree.find((n) => n.label === children)?.id,
        });
      }
    }
    // setGraph(currentGraph);
    // console.log(currentGraph);

    // Executa algortimo
    TarjanOLCA(currentTree, currentTree[0].label, setLowestCommonAncestors);

    // console.log(currentTree);
  };

  const handleInputValues = (element) => {
    const index = inputValues.findIndex(
      (obj) =>
        obj.nodeKey === element.currentTarget.name ||
        obj.linkKey === element.currentTarget.name
    );

    const newInputValues = [...inputValues];
    newInputValues[index][
      element.currentTarget.name.includes("node") ? "nodeValue" : "linkValue"
    ] = element.currentTarget.value;

    setInputValues(newInputValues);
  };

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  return (
    <Container>
      <Aside>
        <h2>Construa seu Gráfico</h2>

        <div>
          <FormCreateGraph>
            <div>
              <span>"Nome" dos nós (o primeiro nó será a raiz)</span>
              <span>"Filhos" dos nós (separado por vírgula)</span>

              <span>EX.: A</span>
              <span>EX.: B, C</span>

              <span>EX.: B</span>
              <span></span>

              <span>EX.: C</span>
              <span></span>

              {(inputValues || []).map((input) => (
                <Fragment key={input.nodeKey}>
                  <input
                    type="text"
                    name={input.nodeKey}
                    onChange={(element) => handleInputValues(element)}
                  />
                  <input
                    type="text"
                    name={input.linkKey}
                    onChange={(element) => handleInputValues(element)}
                  />
                </Fragment>
              ))}

              <Button
                variant="outlined"
                onClick={() => {
                  const newInputValues = [...inputValues];
                  newInputValues.push({
                    nodeKey: `node_${(inputValues || []).length}`,
                    nodeValue: "",
                    linkKey: `link_${(inputValues || []).length}`,
                    linkValue: "",
                  });

                  setInputValues(newInputValues);
                }}
              >
                Adicionar nó
              </Button>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 32 }}
              onClick={handleSubmitForm}
            >
              Carregar Gráfico
            </Button>
          </FormCreateGraph>
        </div>
      </Aside>

      <div style={{ width: "100%", height: "100%" }}>
        <div>
          Menor ancestral comum de{" "}
          <input
            type="text"
            name="n_one"
            onChange={(element) =>
              setResInputValues({
                ...resInputValues,
                n_one: element.currentTarget.value,
              })
            }
          />{" "}
          e{" "}
          <input
            type="text"
            name="n_two"
            onChange={(element) =>
              setResInputValues({
                ...resInputValues,
                n_two: element.currentTarget.value,
              })
            }
          />{" "}
          é{" "}
          <strong>
            {lowestCommonAncestors?.[
              `${resInputValues.n_one}_${resInputValues.n_two}`
            ] ||
              lowestCommonAncestors?.[
                `${resInputValues.n_two}_${resInputValues.n_one}`
              ] ||
              ""}
          </strong>
          .
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network) => {}}
          />
        </div>
      </div>
    </Container>
  );
}

export default App;
