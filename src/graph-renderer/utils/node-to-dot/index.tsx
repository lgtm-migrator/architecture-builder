import GraphNode from '../../../types/GraphNode';
import { map } from 'lodash';

const nodeToDot = (node: GraphNode) =>
  '"' +
  node.id +
  '" [ label ="' +
  [
    node.name,
    ...map(
      node.descriptionItems,
      (value: string, key: string) => key + ': ' + value
    ),
  ].join('|') +
  (node.url ? '" href="' + node.url : '') +
  '" shape="record' +
  '"]';

export default nodeToDot;
