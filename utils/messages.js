const moment = require('moment');

//format message functions converts our message to an object and also adds time. 
const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;