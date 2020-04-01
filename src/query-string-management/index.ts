import React from 'react';
import queryString from 'query-string';

const queryStringOptions: queryString.ParseOptions = {
  arrayFormat: 'comma',
};

export const buildUpdateQuery = (checkedItems: string[]): React.EffectCallback => () => {
  location.hash = queryString.stringify(checkedItems, queryStringOptions);
};

export const buildInitialiseCheckedItemsFromQuery = (setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>): React.EffectCallback => () => {
  const parsedObject: object = queryString.parse(location.hash, queryStringOptions);
  const parsed: string[] = Object.values(parsedObject);
  if (parsed.length) {
    setCheckedItems(parsed);
  }
};
