import React from 'react';
import {
  AdapterContextProvider as Adapters,
  WindowSizeContextProvider
} from '@baaz/adapter';

/**
 * My custom context
 */


/**
 * 
 *
 * @property {React.Component[]} contextProviders
 */
const contextProviders = [
  Adapters,
  WindowSizeContextProvider
];

const ContextProvider = ({ children }) => {
  return contextProviders.reduceRight((memo, ContextProvider) => {
    return <ContextProvider>{memo}</ContextProvider>;
  }, children);
};

export default ContextProvider;
