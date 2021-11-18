import GraphNode from '../../../types/GraphNode';
import { map, startCase } from 'lodash';

const titleBackgroundColor = 'mediumorchid';
const titleFontColor = 'white';
const font = 'Helvetica Neue';

const getDetailNode = (node: GraphNode) =>
  `"${
    node.id
  }" [ label=<<font face="${font}"><table border="1" cellpadding="8" cellspacing="0"><tr><td colspan="2" bgcolor="${titleBackgroundColor}" border="0" port="root"><font color="${titleFontColor}" point-size="18">${
    node.name
  }</font></td></tr>${map(
    node.descriptionItems,
    (value: string, key: string) =>
      `<tr><td align="right" border="0" bgcolor="white">${startCase(
        key
      )}</td><td align="left" border="0" bgcolor="white">${value}</td></tr>`
  ).join('')}</table></font>> shape="none"]`;

const getSimpleNode = (node: GraphNode) =>
  `"${node.id}" [label=<<font face="${font}">${
    node.name
  }</font>> fillcolor="${titleBackgroundColor}" fontcolor="${titleFontColor}" shape="box" style="filled" ${`tooltip="${map(
    node.descriptionItems,
    (value: string, key: string) => `${startCase(key)}: ${value}\n`
  ).join('')}"`}]`;

const buildNodeToDot = (showDetail: boolean) => (showDetail ? getDetailNode : getSimpleNode);

export default buildNodeToDot;
