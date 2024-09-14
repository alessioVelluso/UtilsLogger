import { Logger } from "utils-logger";

// You can override  it to use it a class for all your different utils, or simply use the default class like
// const gu = new GenericUtils();
// Anyway, i suggest it to use it in a static way, so creating a single object and exporting it for all the project.

export default new Logger({
    debug:true,
    logFilePath: "../files/logs.txt"
});
