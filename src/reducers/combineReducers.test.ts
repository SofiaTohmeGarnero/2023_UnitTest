import combineReducers from './index';
import { configureStore } from "@reduxjs/toolkit";
import { initialState } from './mode';

describe('Root Reducer Suite', () => {

  let store = configureStore({reducer:combineReducers})

  it('loaded correctly', () => {
    expect(store.getState().mode).toEqual(initialState);
  });
});