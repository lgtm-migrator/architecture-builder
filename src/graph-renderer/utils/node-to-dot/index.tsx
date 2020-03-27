import GraphNode from "../../../types/GraphNode";
const mapWithKeys = require("lodash/fp/map").convert({ cap: false });

const nodeToDot = (node: GraphNode) =>
  '"' +
  node.id +
  '" [ label ="' +
  [
    node.name,
    ...mapWithKeys(
      (value: string, key: string) => key + ": " + value,
      node.descriptionItems
    )
  ].join("|") +
  (node.url ? '" href="' + node.url : "") +
  '" shape="record' +
  '"]';

export default nodeToDot;
