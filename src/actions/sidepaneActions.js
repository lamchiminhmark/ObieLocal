import { TOGGLE_SIDE_PANE } from './types';

/**
 * 
 * @param {{close?: boolean}} args 
 */
export const toggleSidepane = args => dispatch => {
    dispatch({
        type: TOGGLE_SIDE_PANE,
        args
    })
}