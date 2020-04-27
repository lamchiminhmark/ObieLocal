 /**
 * raccoon-wrapper.js
 * Cloud function to be called from client to call the 'Like' API
 *
 * Khang Nguyen
 * 4/26/2020
 */

/**
 * Responds to a POST request to 'Like' a list of items
 * @param {Object} req Cloud Function request context. E.g
 * {method: 'POST,
    headers: {
        'Content-Type': 'application/json',
        },
    body: {userId: 1703, items: ['Lecture', 'Computer Science']}}
 * @param {Object} res Cloud Function response context.
 */
module.exports.likeEvent = async function(req, res) {
    switch (req.method){
        case 'PUT':
            res.status(403).send('Forbidden!');
            break;
        case 'POST':
            let userId = res.body.userId;
            let items = res.body.items;
            if (userId && items) {
                try {
                    //Create an array of async functions
                    const asyncLikeFunctions = items.map(item => sendLike(userId,item));
                    //Run all the send likes concurrently
                    await Promise.all(asyncLikeFunctions);
                    res.status(200).send("All likes sent!");
                }
                catch(err) {
                    console.error("Error sending likes!", err);
                }

            }
            else {
                res.status(405).send({error: 'userId and items cannot be empty'});
            }
        default:
            res.status(405).send({error: 'Only POST request is allowed!'});
    }
}

/**
 * Call the Like API with the userId and itemId
 * @param {number} userId the ID of the user who liked
 * @param {number} itemId the list of the items that were liked
 */
sendLike = async function(userId, itemId){
    fetch('/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, itemId }),
    })
}


