const dayjs = require("dayjs");

const format = "YYYYMMDD";
/**
 * @example ```js const now = getNow();```
 * @returns {string} now - the current timestamp
 */
const getToday = () => dayjs().format(format);

module.exports = getToday;
