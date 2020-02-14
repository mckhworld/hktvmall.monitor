const axios = require('axios');

const telegramBot = {};

telegramBot.sendTelegramMessage = function(token, chatId, messageText, notify = true, preview = true) {
    let url = `https://api.telegram.org/bot${token}/sendMessage`
    let body = {
        chat_id: chatId,
        text: messageText,
        parse_mode: "HTML",
        disable_notification: !notify,
        disable_web_page_preview: !preview
    };
    // console.debug(`Sending Telegram message request: ${JSON.stringify(body)}`);
    axios.post(url, body).then(result => {
        // console.debug(`sendTelegramMessage result: ${JSON.stringify(result)}`);
    }).catch(err => {
        console.error(`sendTelegramMessage error: ${JSON.stringify(err)}`);
    });
}

telegramBot.sendTypingAction = function(token, chatId) {
    let url = `https://api.telegram.org/bot${token}/sendChatAction`
    let body = {
        chat_id: chatId,
        action: "typing"
    };
    // console.debug(`Sending Telegram message request: ${JSON.stringify(body)}`);
    axios.post(url, body).then(result => {
        // console.debug(`sendTypingAction result: ${JSON.stringify(result)}`);
    }).catch(err => {
        console.error(`sendTypingAction error: ${JSON.stringify(err)}`);
    });
}

telegramBot.setChatDescription = function(token, chatId, description) {
    let url = `https://api.telegram.org/bot${token}/setChatDescription`
    let body = {
        chat_id: chatId,
        description: description
    };
    axios.post(url, body).then(result => {
        // console.debug(`setChatDescription result: ${JSON.stringify(result)}`);
    }).catch(err => {
        console.error(`setChatDescription error: ${JSON.stringify(err)}`);
    });
}

module.exports = telegramBot;