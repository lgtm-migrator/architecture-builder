import { filter, includes, map, sortBy, toLower } from 'lodash';
import { useQueryParam, ArrayParam } from 'use-query-params';
import React from 'react';
import styled from 'styled-components';

import CheckBox from './types/CheckBox';
import GraphEdge from './types/GraphEdge';
import GraphNode from './types/GraphNode';
import GraphRenderer from './graph-renderer';

const Wrapper = styled.div`
  align-items: top;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const Sidebar = styled.div`
  flex-shrink: 0;
  width: 18rem;
  margin: 1rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  min-height: 2rem;
  margin-bottom: 1rem;
`;

const header = [
  'strict digraph SoftwareArchitecture {',
  'overlap = false;',
  'node [fontsize=16 fontname="Proxima Nova"];',
  'rankdir="LR"',
  'outputorder="edgesfirst"',
];

const filterNodes = (graphNode: GraphNode[]) => (
  checkedItems: string[] | undefined
) => filter(graphNode, (node: GraphNode) => includes(checkedItems, node.id));

const filterEdges = (graphEdge: GraphEdge[]) => (
  checkedItems: string[] | undefined
) =>
  filter(
    graphEdge,
    (edge: GraphEdge) =>
      includes(checkedItems, edge.from) && includes(checkedItems, edge.to)
  );

export const ArchitectureBuilder = ({
  edges,
  nodes,
}: {
  edges: GraphEdge[];
  nodes: GraphNode[];
}) => {
  const checkBoxes: CheckBox[] = sortBy(
    map(nodes, (node: GraphNode) => ({ value: node.id, name: node.name })),
    (node: CheckBox) => toLower(node.name)
  );
  const [checkedItems, setCheckedItems] = useQueryParam('a', ArrayParam);

  const handleChange = (event: {
    target: { checked: boolean; name: string };
  }) => {
    const clonedSet = new Set(checkedItems);
    clonedSet[event.target.checked ? 'add' : 'delete'](event.target.name);
    setCheckedItems(Array.from(clonedSet));
  };

  const handleSelectAll = () => setCheckedItems(map(checkBoxes, 'value'));
  const handleClear = () => setCheckedItems([]);

  return (
    <Wrapper>
      <Sidebar>
        <Button onClick={handleSelectAll}>Select all</Button>
        <Button onClick={handleClear}>Clear</Button>
        {checkBoxes.map((item: CheckBox) => (
          <div key={item.value}>
            <label>
              <input
                checked={includes(checkedItems, item.value)}
                name={item.value}
                onChange={handleChange}
                type="checkbox"
              />
              {item.name.split('\n')[0]}
            </label>
          </div>
        ))}
      </Sidebar>
      <GraphRenderer
        {...{
          edges: filterEdges(edges)(checkedItems),
          header,
          nodes: filterNodes(nodes)(checkedItems),
        }}
      />
    </Wrapper>
  );
};
