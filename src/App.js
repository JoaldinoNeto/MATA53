import { useState } from "react";

import Graph from "react-graph-vis";
import { isEmpty } from "lodash";

import Aside from "./components/Aside";
import { Container } from "./style";

function App() {
  const [lowestCommonAncestors, setLowestCommonAncestors] = useState({});
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  const [resInputValues, setResInputValues] = useState([
    { n_one: "", n_two: "" },
  ]);

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
      <Aside
        setLowestCommonAncestors={setLowestCommonAncestors}
        setGraph={setGraph}
      />

      <div style={{ width: "100%", height: "100%" }}>
        <div>
          {!isEmpty(lowestCommonAncestors) ? (
            <>
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
            </>
          ) : (
            <>
              Preencha as informações do grafo ao lado e cllique em CARREGAR
              GRÁFO
            </>
          )}
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          {graph.nodes &&
            graph.nodes.length > 0 &&
            graph.edges &&
            graph.edges.length > 0 && (
              <Graph
                graph={graph}
                options={options}
                events={events}
                getNetwork={(network) => {}}
              />
            )}
        </div>
      </div>
    </Container>
  );
}

export default App;
