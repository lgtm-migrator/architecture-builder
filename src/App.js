import { header, edges, nodes } from "./graph-definition";
import GraphRenderer from "./graph-renderer";
import keys from "lodash/fp/keys";
import pickBy from "lodash/fp/pickBy";
// import map from "lodash/fp/map";
import React, { useState } from "react";
import styles from "./App.module.css";

const nodeRegex = /([\s\S]*?) \[label="([\s\S]*?)"/;

const checkboxes = nodes.sort().map(node => {
  const [original, value, name] = node.match(nodeRegex);
  return { value, name };
});

// const initialState = Object.assign(
//   {},
//   ...map(({ value }) => ({ [value]: true }))(checkboxes)
// );
// console.log(initialState);

const App = () => {
  const [checkedItems, setCheckedItems] = useState({API: true, WHICS_WS: true, WHICS: true});

  const handleChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        {checkboxes.map(item => (
          <div key={item.value}>
            <label>
              <input
                checked={checkedItems[item.value] || false}
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
          nodesToShow: keys(pickBy(checkedItems))
        }}
      />
    </div>
  );
};

export default App;
