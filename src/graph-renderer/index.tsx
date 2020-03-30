import { Module, render } from 'viz.js/full.render.js';
import { map, replace } from 'lodash';
import React, { useState } from 'react';
import Viz from 'viz.js';

import edgeToDot from './utils/edge-to-dot';
import GraphEdge from '../types/GraphEdge';
import GraphNode from '../types/GraphNode';
import nodeToDot from './utils/node-to-dot';

const viz = new Viz({ Module, render });

const newLine = '\n';

const removeExplicitDimensions = (svgString: string) =>
  replace(
    svgString,
    /width="(.*?)" height="(.*?)"/,
    'width="100%" height="100%"'
  );

const GraphRenderer = ({
  header,
  edges,
  nodes,
}: {
  header: string[];
  edges: GraphEdge[];
  nodes: GraphNode[];
}) => {
  const [svgString, setSvgString] = useState('');

  const allItems: string[][] = [
    header,
    map(edges, edgeToDot),
    map(nodes, nodeToDot),
    ['}'],
  ];

  viz
    .renderString(
      allItems.map((subarray: string[]) => subarray.join(newLine)).join(newLine)
    )
    .then(setSvgString)
    .catch(console.error);

  if (!svgString) {
    return <div>Rendering</div>;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: removeExplicitDimensions(svgString) }}
    />
  );
};
export default GraphRenderer;
