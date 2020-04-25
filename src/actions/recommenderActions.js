export const likeEvent = (userId, categories) => dispatch => {
    const requestOptions  = {
        method: 'POST',
        headers: {'Content_Type': 'application/json'},
        body: JSON.stringify({userId, categories})
    }
    return fetch('/rateEvent', requestOptions)
      .catch(error => console.error('Failed to rate event ', error));
  };