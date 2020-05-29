const initState = {}

export const recommenderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RATE_EVENT_SUCCESS':
            return { ...state };
        case 'RATE_EVENT_ERROR':
            return {
                ...state,
                error: action.error
            };
        default:
            return { ...state };
    }
}

export default recommenderReducer;