require('dotenv').config()

const hktvmallCheckStock = require('./common/hktvmallCheckStock');
const telegramBot = require('./common/telegramBot');

const telegramToken = process.env.TG_TOKEN;
const telegramChatId = process.env.TG_CHATID;
const alertSuppressionSec = 1 * process.env.TG_SUPPRESS_SEC;

const hktvmallProducts = [
    { name: "SCOTT - [3件裝] 絲潔盒裝面紙 (5合1)", url: "https://www.hktvmall.com/hktv/zh/main/Kimberly-Clark-Family-Care-Store/s/H0551003/%E8%B6%85%E7%B4%9A%E5%B7%BF%E5%A0%B4/%E8%B6%85%E7%B4%9A%E5%B8%82%E5%A0%B4/%E7%B4%99%E5%93%81-%E5%8D%B3%E6%A3%84%E5%93%81-%E5%AE%B6%E5%B1%85%E7%94%A8%E5%93%81/%E7%9B%92%E8%A3%9D%E7%B4%99%E5%B7%BE/3%E4%BB%B6%E8%A3%9D-%E7%B5%B2%E6%BD%94%E7%9B%92%E8%A3%9D%E9%9D%A2%E7%B4%99-5%E5%90%881/p/H0888001_S_10050054B" }
]

let lastAlerts = new Map();

async function main() {
    while (true) {
        hktvmallProducts.forEach(product => {
            hktvmallCheckStock(product.url)
                .then(stockCheckResult => {
                    console.log(`${new Date()}: ${product.name}: ${stockCheckResult}`);
                    if (stockCheckResult) {
                        let lastAlert = lastAlerts.get(product.name);
                        if (!lastAlert || lastAlert.getTime() < new Date().getTime() - alertSuppressionSec * 1000) { // at most 1 alert in 5 minutes (300000 millisec)
                            telegramBot.sendTelegramMessage(telegramToken, telegramChatId, `${product.name} - 😁😁😁✔✔✔ <b>available</b> <a href="${product.url}">Link</a> (${new Date()})`, true, false);
                            lastAlerts.set(product.name, new Date());
                        } else {
                            console.debug(` - Alert suppressed, last sent at ${lastAlert}.`);
                        }
                    } else {}
                    telegramBot.setChatDescription(telegramToken, telegramChatId, `Last updated: ${new Date()}`);
                })
                .catch(err => console.error(err));
        })

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