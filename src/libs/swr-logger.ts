import { type Middleware } from 'swr';

// @ts-ignore
export const swrLogger: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const extendedFetcher = (...args: unknown[]) => {
      const headerStyles = 'color: gray; font-weight: lighter;';
      const titleStyles = 'color: #8f52e1; font-weight: bold';
      const cKey = Array.isArray(key) ? key?.[0] : key;

      /* eslint-disable no-console */
      console.groupCollapsed(`%c action %c${cKey}`, headerStyles, titleStyles);
      console.log('Keys', key);
      console.log('Config', config);
      console.groupEnd();
      /* eslint-enable no-console */

      return fetcher?.(...args);
    };

    // @ts-ignore
    return useSWRNext(key, extendedFetcher, config);
  };
};
