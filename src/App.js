import { header, edges, nodes } from "./graph-definition";
import { useQueryParam, ArrayParam } from "use-query-params";
import GraphRenderer from "./graph-renderer";
import includes from "lodash/fp/includes";
import React from "react";
import styles from "./App.module.css";

const nodeRegex = /([\s\S]*?) \[label="([\s\S]*?)"/;

const checkboxes = nodes.sort().map(node => {
  const [original, value, name] = node.match(nodeRegex);
  return { value, name };
});

const App = () => {
  const [checkedItems, setCheckedItems] = useQueryParam("a", ArrayParam);

  const handleChange = event => {
    const clonedSet = new Set(checkedItems);
    clonedSet[event.target.checked ? "add" : "delete"](event.target.name);
    setCheckedItems([...clonedSet]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        {checkboxes.map(item => (
          <div key={item.value}>
            <label>
              <input
                checked={includes(item.value)(checkedItems)}
                name={item.value}
                onChange={handleChange}
                type="checkbox"
              />
              {item.name.split("\n")[0]}
            </label>
          </div>
        ))}
      </div>
      <GraphRenderer
        {...{
          edges,
          header,
          nodes,
          nodesToShow: checkedItems
        }}
      />
    </div>
  );
};

export default App;
