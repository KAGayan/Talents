import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from 'store';

export const useMappedState: TypedUseSelectorHook<RootState> = useSelector;
