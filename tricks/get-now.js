import dayjs from "dayjs";

const timestampFormat = "dddd D MMMM YYYY, h:mm:ss:SSS A [UTC]Z";

export const getNow = () => dayjs().format(timestampFormat);
