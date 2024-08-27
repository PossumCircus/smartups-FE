// src/declarations.d.ts

import { compose } from 'redux';

// CSS modules
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

// Third-party libraries
declare module 'dompurify';
declare module 'react-copy-to-clipboard';

// Global variables
declare const __DEV__: boolean;

// Utility types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// Example global interface
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// This is required to ensure that the above declarations are treated as global.
export {};
