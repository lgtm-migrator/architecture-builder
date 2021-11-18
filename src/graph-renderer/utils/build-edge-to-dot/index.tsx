import { replace } from 'lodash/fp';
import rgbHex from 'rgb-hex';

import GraphEdge from '../../../types/GraphEdge';

const font = 'Helvetica Neue';

const getColorPart = (edge: GraphEdge) => Math.min((Math.log(edge.minutesBetweenData) / Math.log(1440)) * 255, 230);

const getDescriptionParts = (edge: GraphEdge, showDetail: boolean) => {
  if (!edge.description) {
    return '';
  }

  const safeDescription = replace(/['"]+/g, '', edge.description);
  const tooltip = `tooltip="${safeDescription}"`;

  if (showDetail) {
    return `label=<<font face="${font}">${safeDescription}</font>> ${tooltip}`;
  }
  return tooltip;
};

const edgeToDot = (showDetail: boolean) => (edge: GraphEdge) => {
  const greyValue = getColorPart(edge);
  const hexColor = rgbHex(greyValue, greyValue, greyValue);

  return `"${edge.from}" -> "${edge.to}" [color="#${hexColor}" ${getDescriptionParts(edge, showDetail)}]`;
};

export default edgeToDot;
