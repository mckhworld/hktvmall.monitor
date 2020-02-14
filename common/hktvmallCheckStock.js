const getHttpContent = require('./getHttpContent');

async function hktvmallCheckStock(url) {
    return new Promise((resolve, error) => {
        getHttpContent(url)
            .then(content => {
                let foundText = content.match(/.*<span>有貨通知我<\/span>.*/);
                let stockAvailable = !foundText || foundText.length == 0;
                // console.debug(`Stock available: ${stockAvailable}`);
                resolve(stockAvailable);
            })
            .catch(err => {
                console.error(`hktvmallCheckStock: Unable to check stock, error: ${err}`);
            });
    });
}

module.exports = hktvmallCheckStock;