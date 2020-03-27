import { useQueryParam, ArrayParam } from 'use-query-params';
import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import includes from 'lodash/fp/includes';
import map from 'lodash/fp/map';
import React from 'react';
import sortBy from 'lodash/fp/sortBy';
import styled from 'styled-components';
import toLower from 'lodash/fp/toLower';

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

const filterNodes = (checkedItems: string[] | undefined) =>
  filter((node: GraphNode) => includes(node.id, checkedItems));

const filterEdges = (checkedItems: string[] | undefined) =>
  filter(
    (edge: GraphEdge) =>
      includes(edge.from, checkedItems) && includes(edge.to, checkedItems)
  );

export const ArchitectureBuilder = ({
  edges,
  nodes,
}: {
  edges: GraphEdge[];
  nodes: GraphNode[];
}) => {
  const checkBoxes: CheckBox[] = flow(
    map((node: GraphNode) => ({ value: node.id, name: node.name })),
    sortBy((node: CheckBox) => toLower(node.name))
  )(nodes);
  const [checkedItems, setCheckedItems] = useQueryParam('a', ArrayParam);

  const handleChange = (event: {
    target: { checked: boolean; name: string };
  }) => {
    const clonedSet = new Set(checkedItems);
    clonedSet[event.target.checked ? 'add' : 'delete'](event.target.name);
    setCheckedItems(Array.from(clonedSet));
  };

  const handleSelectAll = () => setCheckedItems(map('value', checkBoxes));
  const handleClear = () => setCheckedItems([]);

  return (
    <Wrapper>
      <Sidebar>
        <Button onClick={handleSelectAll}>
          Select all
        </Button>
        <Button onClick={handleClear}>
          Clear
        </Button>
        {checkBoxes.map((item: CheckBox) => (
          <div key={item.value}>
            <label>
              <input
                checked={includes(item.value)(checkedItems)}
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
          edges: filterEdges(checkedItems)(edges),
          header,
          nodes: filterNodes(checkedItems)(nodes),
        }}
      />
    </Wrapper>
  );
};
