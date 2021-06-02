import { useState, Fragment } from "react";

import Button from "@material-ui/core/Button";
import { pick } from "lodash";

import ImageFrame from "../ImageFrame";
import { Aside, FormCreateGraph } from "./style";
import TarjanOLCA from "../../utils/TarjanOLCA";
import graph1 from "../../assets/images/grafo_default.jpg";
import graph2 from "../../assets/images/graph2.jpg";

function AsideComponent(props) {
  const { setLowestCommonAncestors, setGraph } = props;

  const [inputValues, setInputValues] = useState([
    { nodeKey: "node_0", nodeValue: "", linkKey: "link_0", linkValue: "" },
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
      for (let children of node?.children || []) {
        currentGraph.edges.push({
          from: node.id,
          to: currentTree.find((n) => n.label === children)?.id,
        });
      }
    }
    setGraph(currentGraph);

    // Executa algortimo
    TarjanOLCA(currentTree, currentTree[0].label, setLowestCommonAncestors);

    // console.log(currentTree);
  };

  const handleInputValues = (element) => {
    // Reseta o grafo
    setGraph({ nodes: [], edges: [] });

    // Atribui valores do input
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

  return (
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
                  value={input.nodeValue}
                  onChange={(element) => handleInputValues(element)}
                />
                <input
                  type="text"
                  name={input.linkKey}
                  value={input.linkValue}
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
            Carregar Grafo
          </Button>
        </FormCreateGraph>

        <div>
          <h4>
            Se preferir pode clicar na imagem do grafo para carregar o exemplo:
          </h4>

          <div style={{ display: "flex" }}>
            <ImageFrame
              img={graph1}
              onClick={() => {
                // Reseta o grafo
                setGraph({ nodes: [], edges: [] });

                // Atribui valores do input
                setInputValues([
                  {
                    nodeKey: "node_0",
                    nodeValue: "A",
                    linkKey: "link_0",
                    linkValue: "B,C",
                  },
                  {
                    nodeKey: "node_1",
                    nodeValue: "B",
                    linkKey: "link_1",
                    linkValue: "",
                  },
                  {
                    nodeKey: "node_2",
                    nodeValue: "C",
                    linkKey: "link_2",
                    linkValue: "D,E",
                  },
                  {
                    nodeKey: "node_3",
                    nodeValue: "D",
                    linkKey: "link_3",
                    linkValue: "",
                  },
                  {
                    nodeKey: "node_4",
                    nodeValue: "E",
                    linkKey: "link_4",
                    linkValue: "",
                  },
                ]);
              }}
            />

            <ImageFrame
              img={graph2}
              onClick={() => {
                // Reseta o grafo
                setGraph({ nodes: [], edges: [] });

                // Atribui valores do input
                setInputValues([
                  {
                    nodeKey: "node_0",
                    nodeValue: "C",
                    linkKey: "link_0",
                    linkValue: "A,E,D",
                  },
                  {
                    nodeKey: "node_1",
                    nodeValue: "A",
                    linkKey: "link_1",
                    linkValue: "B",
                  },
                  {
                    nodeKey: "node_2",
                    nodeValue: "B",
                    linkKey: "link_2",
                    linkValue: "",
                  },
                  {
                    nodeKey: "node_3",
                    nodeValue: "E",
                    linkKey: "link_3",
                    linkValue: "F",
                  },
                  {
                    nodeKey: "node_4",
                    nodeValue: "F",
                    linkKey: "link_4",
                    linkValue: "",
                  },
                  {
                    nodeKey: "node_5",
                    nodeValue: "D",
                    linkKey: "link_5",
                    linkValue: "",
                  },
                ]);
              }}
            />
          </div>
        </div>
      </div>
    </Aside>
  );
}

export default AsideComponent;
