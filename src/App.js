import { useState, Fragment } from "react";

import Button from "@material-ui/core/Button";

import { Container, Aside, FormCreateGraph } from "./style";
import TarjanOLCA from "./utils/TarjanOLCA";

function App() {
  const [inputValues, setInputValues] = useState([
    { nodeKey: "node_0", nodeValue: "", linkKey: "link_0", linkValue: "" },
  ]);
  const [lowestCommonAncestors, setLowestCommonAncestors] = useState({});

  const handleSubmitForm = () => {
    let currentTree = [];

    for (let input of inputValues) {
      if (input.nodeValue) {
        currentTree.push({
          label: input.nodeValue || input.nodeKey,
          children:
            input?.linkValue && input?.linkValue.length > 0
              ? (input.linkValue || "").replaceAll(" ", "").split(",")
              : [],
          parent: undefined,
          rank: undefined,
          ancestor: undefined,
          color: "white",
        });
      }
    }

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
                  ></input>
                  <input
                    type="text"
                    name={input.linkKey}
                    onChange={(element) => handleInputValues(element)}
                  ></input>
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

      <div onClick={() => console.log(lowestCommonAncestors)}>Teste</div>
    </Container>
  );
}

export default App;
