const axios = require('axios');

function getHttpContent(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(resp => {
                // console.debug('getHttpContent result: ' + resp.data);
                resolve(resp.data);
            })
            .catch(err => {
                reject('getHttpContent error: ' + err);
            });
    });
}

module.exports = getHttpContent;