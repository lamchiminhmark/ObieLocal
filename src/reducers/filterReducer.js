import {FILTER_BY_DAY} from '../actions/types';

const initialState = {
    filterDay: 0 //today
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_BY_DAY:
            return {
                filterDay: action.payload
            }
        default:
            return state;
    }
}

export default filterReducer;