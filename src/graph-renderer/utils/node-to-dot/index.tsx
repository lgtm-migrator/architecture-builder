import GraphNode from '../../../types/GraphNode';
import { map, startCase } from 'lodash';

const nodeToDot = (node: GraphNode) =>
  `"${
    node.id
  }" [ label=<<font face="Helvetica Neue"><table border="1" cellpadding="8" cellspacing="0"><tr><td colspan="2" bgcolor="mediumorchid" border="0" port="root"><font color="white" point-size="18">${
    node.name
  }</font></td></tr>${map(
    node.descriptionItems,
    (value: string, key: string) =>
      `<tr><td align="right" border="0" bgcolor="white">${startCase(
        key
      )}</td><td align="left" border="0" bgcolor="white">${value}</td></tr>`
  ).join('')}</table></font>> shape="none"]`;

export default nodeToDot;
