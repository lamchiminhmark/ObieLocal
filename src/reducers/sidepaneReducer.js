import { TOGGLE_SIDE_PANE, SET_SELECTED_EVENTS } from '../actions/types';

const initialState = {
    createEventContainerOpen: false,
    sidepaneOpen: false,
    activeTab: 'Event'
};

const sidepaneReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SELECTED_EVENTS:
            return {
                ...state,
                sidepaneOpen: true,
                activeTab: 'Event'
            };
        case TOGGLE_SIDE_PANE:
            const obj = action.args
            if (state.createEventContainerOpen) return;
            if (obj && obj.close) return { ...state, sidepaneOpen: !obj.close }
            else return{ ...state, sidepaneOpen: !state.sidepaneOpen }
        default:
            return state
    }
}

export default sidepaneReducer