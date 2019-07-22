import { TOGGLE_SIDE_PANE, CHANGE_TAB } from './types';

/**
 * @param {{close?: boolean}} payload if close is true, just close sidepane
 */
export const toggleSidepane = payload => dispatch => {
  dispatch({
    type: TOGGLE_SIDE_PANE,
    payload: payload || {}
  });
};

export const changeTab = tab => dispatch => {
  dispatch({
    type: CHANGE_TAB,
    payload: { tab }
  });
};
