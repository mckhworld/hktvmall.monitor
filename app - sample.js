const hktvmallCheckStock = require('./common/hktvmallCheckStock');
const telegramBot = require('./common/telegramBot');

const telegramToken = "12345678:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const telegramChatId = "@telegramChatId";

const hktvmallProducts = [
    { name: "金象牌 - 頂上茉莉香米 5公斤", url: "https://www.hktvmall.com/hktv/zh/main/%E5%A4%A7%E8%A1%97%E5%B8%82/s/H0888001/%E8%B6%85%E7%B4%9A%E5%B7%BF%E5%A0%B4/%E8%B6%85%E7%B4%9A%E5%B8%82%E5%A0%B4/%E7%B1%B3-%E9%A3%9F%E6%B2%B9/%E7%B1%B3/%E5%85%B6%E4%BB%96%E9%A6%99%E7%B1%B3/%E9%A0%82%E4%B8%8A%E8%8C%89%E8%8E%89%E9%A6%99%E7%B1%B3-5%E5%85%AC%E6%96%A4-%E6%AF%8F%E5%80%8B%E5%AE%A2%E6%88%B6%E5%8F%AA%E5%8F%AF%E9%99%90%E8%B3%BC1%E5%8C%85/p/H0888001_S_10015152" },
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
                        if (!lastAlert || lastAlert.getTime < new Date().getTime - 300000) { // at most 1 alert in 5 minutes (300000 millisec)
                            telegramBot.sendTelegramMessage(telegramToken, telegramChatId, `${product.name} - ✔✔✔ <b>available</b> <a href="${product.url}">Link</a> (${new Date().toISOString()})`, true, false);
                        }
                        lastAlerts.set(product.name, new Date());
                    } else {}
                    telegramBot.setChatDescription(telegramToken, telegramChatId, `Last updated: ${new Date().toISOString()}`);
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