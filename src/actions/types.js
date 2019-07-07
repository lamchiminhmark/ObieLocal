// Specifying action types allowed in the app

/** Redux action: Retrieves events from database */
export const FETCH_DATA='FETCH_DATA';
/** Redux action: Set the selected events to the clicked marker */
export const SET_SELECTED_EVENTS = 'SET_SELECTED_EVENTS';
/** Redux action: Pop in and out sidepane */
export const TOGGLE_SIDE_PANE = 'TOGGLE_SIDE_PANE';
/** Redux action: Focus and zoom map to a coordinates */
export const RECENTER_MAP = 'RECENTER_MAP';
/** Redux action: Move between different events stored in one marker (events happening at the same location) */
export const TOGGLE_EVENT = 'TOGGLE_EVENT';