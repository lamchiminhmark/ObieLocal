/**
 * @param {uid} userId 
 * @param {string[]} items 
 * @param {string} type can be like, dislike, unlike or undislike
 */
export const rateEvent = (userId, items, type) => dispatch => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify({ userId, items, type })
    }
    return fetch('/rateEvent', requestOptions)
        .then(() => dispatch({
            type: 'RATE_EVENT_SUCCESSFUL'
        }))
        .catch(error => {
            console.error('Failed to rate event ', error)
            dispatch({
                type: 'RATE_EVENT_ERROR',
                error
            })
        });
};