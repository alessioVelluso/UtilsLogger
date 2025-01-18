import { FileLogType, Logger } from "utils-logger-av";

// You can override  it to use it a class for all your different utils, or simply use the default class like
// export default new Logger({
//     debug:true,
//     logFilePath: "../files/logs.txt"
// });


// Anyway, i suggest it to use it in a static way, so creating a single object and exporting it for all the project.
// (you can obviously avoid to create a class extending mine)
class MyLogger extends Logger
{
    public baseFile = (message:any, type:FileLogType) => {
        this.base(message);
        this.logFile(message, type)
    }
}

const log = new MyLogger({
    debug:true,
    logFilePath: "../files/logs.txt",
    primaryColor: "cyan"
});


export { log };
