const hktvmallCheckStock = require('./common/hktvmallCheckStock');
const telegramBot = require('./common/telegramBot');

const telegramToken = "12345678:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const telegramChatId = "@telegramChatId";

async function main() {
    while (true) {
        const productUrl = 'https://www.hktvmall.com/hktv/zh/main/Kimberly-Clark-Family-Care-Store/s/H0551003/%E8%B6%85%E7%B4%9A%E5%B7%BF%E5%A0%B4/%E8%B6%85%E7%B4%9A%E5%B8%82%E5%A0%B4/%E7%B4%99%E5%93%81-%E5%8D%B3%E6%A3%84%E5%93%81-%E5%AE%B6%E5%B1%85%E7%94%A8%E5%93%81/%E7%9B%92%E8%A3%9D%E7%B4%99%E5%B7%BE/3%E4%BB%B6%E8%A3%9D-%E7%B5%B2%E6%BD%94%E7%9B%92%E8%A3%9D%E9%9D%A2%E7%B4%99-5%E5%90%881/p/H0888001_S_10050054B';
        const productName = 'SCOTT - [3件裝] 絲潔盒裝面紙 (5合1)';
        hktvmallCheckStock(productUrl)
            .then(stockCheckResult => {
                console.log(`${new Date()}: ${productName}: ${stockCheckResult}`);
                if (stockCheckResult) {
                    telegramBot.sendTelegramMessage(telegramToken, telegramChatId, `${new Date()}: ${productName} - ✔✔✔ <b>available</b> <a href="${productUrl}">Link</a>`, true, false);
                } else {
                    telegramBot.setChatDescription(telegramToken, telegramChatId, `${new Date()}: ${productName}`);
                }
            })
            .catch(err => console.error(err));
        await delay(10000);
    }
}

function delay(timeoutMillisec) {
    return new Promise((resolve, error) => {
        setTimeout(() => {
            resolve(true);
        }, timeoutMillisec)
    });
}

main();