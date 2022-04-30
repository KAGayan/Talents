import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'store';
import { actions } from 'store';

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators({ ...actions }, dispatch);
};
