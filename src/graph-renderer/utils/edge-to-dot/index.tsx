import GraphEdge from '../../../types/GraphEdge';
import rgbHex from 'rgb-hex';

const getColorPart = (edge: GraphEdge) =>
  Math.min((Math.log(edge.minutesBetweenData) / Math.log(1440)) * 255, 230);

const edgeToDot = (edge: GraphEdge) =>
  '"' +
  edge.from +
  '" -> "' +
  edge.to +
  '" [color="#' +
  rgbHex(getColorPart(edge), getColorPart(edge), getColorPart(edge)) +
  '"]';

export default edgeToDot;
