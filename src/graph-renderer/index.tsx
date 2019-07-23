import { Module, render } from "viz.js/full.render.js";
import includes from "lodash/fp/includes";
import React, { useState } from "react";
import split from "lodash/fp/split";
import Viz from "viz.js";

const viz = new Viz({ Module, render });

const filterItems = ({
  items,
  nodesToShow,
  relevantIndices,
  splitter
}: {
  items: string[];
  nodesToShow: string[];
  relevantIndices: number[];
  splitter: RegExp;
}) =>
  items.filter((item: string) =>
    split(splitter, item)
      .filter((part: string, index: number) => includes(index, relevantIndices))
      .every((relevantPart: string) => includes(relevantPart, nodesToShow))
  );

const GraphRenderer = ({
  header,
  edges,
  nodes,
  nodesToShow
}: {
  header: string[];
  edges: string[];
  nodes: string[];
  nodesToShow: string[];
}) => {
  const [svgHtml, setSvgHtml] = useState("");

  const allItems: string[][] = [
    header,
    filterItems({
      items: edges,
      nodesToShow,
      relevantIndices: [0, 2],
      splitter: /( -> | \[)/
    }),
    filterItems({
      items: nodes,
      nodesToShow,
      relevantIndices: [0],
      splitter: / \[/
    }),
    ["}"]
  ];

  viz
    .renderString(
      allItems.map((subarray: string[]) => subarray.join("\n")).join("\n")
    )
    .then(setSvgHtml)
    .catch(console.error);

  if (!svgHtml) {
    return <div>Rendering</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: svgHtml }} />;
};
export default GraphRenderer;
