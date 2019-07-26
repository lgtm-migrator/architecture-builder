import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ArchitectureBuilder } from '../src';

const edges = [
  {
    minutesBetweenData: 0.1,
    from: 'SANITY_BACKEND',
    to: 'SANITY_STUDIO',
  },
  {
    minutesBetweenData: 0.1,
    from: 'SANITY_STUDIO',
    to: 'SANITY_BACKEND',
  },
  {
    minutesBetweenData: 0.1,
    from: 'SANITY_BACKEND',
    to: 'WEBSITE',
  },
];

const nodes = [
  {
    id: 'SANITY_STUDIO',
    name: 'Sanity Studio',
    descriptionItems: {
      featureList: 'Headless Content Management System Front-end',
      identifier: 'xxxyyy',
      author: 'ahm Digital',
    },
    url: 'https://ahm.sanity.studio',
  },
  {
    id: 'SANITY_BACKEND',
    name: 'Sanity Backend',
    descriptionItems: {
      featureList: 'Content data store',
      author: 'Sanity',
    },
    url: undefined,
  },
  {
    id: 'WEBSITE',
    name: 'ahm.com.au',
    descriptionItems: {
      featureList: 'Join health insurance, View member perks',
      author: 'ahm Digital',
    },
    url: 'https://ahm.com.au',
  },
];

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArchitectureBuilder edges={edges} nodes={nodes} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
