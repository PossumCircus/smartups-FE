import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use these hooks throughout your app instead of plain `useDispatch` and `useSelector`

// Typed version of useDispatch hook
export const useDispatch = () => useReduxDispatch<AppDispatch>();

// Typed version of useSelector hook
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
