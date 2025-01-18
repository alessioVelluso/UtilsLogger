# Utils Logger Av



`v3.0.1`

This is a package i made for myself but can surely be helpful to others, feel free to contribute if you like it.



## Install:

```bash
npm install utils-logger-av
```

The Logger is just an exported class, the interface is as it follows:


## Logger Class

```ts
interface ILogger {
    logDetail: (coloredMessage:any, ...messages:any[]) => void;
    logError: (coloredMessage:any,...errs:any[]) => void;

    base: (coloredMessage:any, ...messages:any[]) => void;
    white: (coloredMessage:any, ...messages:any[]) => void;
    green: (coloredMessage:any,...messages:any[]) => void;
    yellow: (coloredMessage:any,...messages:any[]) => void;
    blue: (coloredMessage:any,...messages:any[]) => void;
    magenta: (coloredMessage:any,...messages:any[]) => void;
    cyan: (coloredMessage:any,...messages:any[]) => void;
    gray: (coloredMessage:any,...messages:any[]) => void;
    orange: (coloredMessage:any,...messages:any[]) => void;
    pink: (coloredMessage:any,...messages:any[]) => void;
    purple: (coloredMessage:any,...messages:any[]) => void;
    teal: (coloredMessage:any,...messages:any[]) => void;
    brown: (coloredMessage:any,...messages:any[]) => void;
    lime: (coloredMessage:any,...messages:any[]) => void;
    gold: (coloredMessage:any,...messages:any[]) => void;
    violet: (coloredMessage:any,...messages:any[]) => void;

    logFile: (message:string, type?:"log" | "error") => void;
}


private readonly fileStream:WriteStream = null!;
private readonly isDebug:boolean = true;
protected readonly dateLocale:DateLocales = "it-IT";
protected readonly primaryColor:LogColors = null;
protected readonly isErrorStackFull:boolean = false;
constructor(data?:LoggerConstructor) {
	if (data?.logFilePath) this.fileStream = createWriteStream(data.logFilePath, { flags: 'a' });
}

export interface LoggerConstructor {
    logFilePath?:string,
    debug?:boolean,                 // if set to false, there won't be any more log.
    locale?: DateLocales,           // to set the locale timezone view
    primaryColor?:LogColors,        // set your color for the "base" method. default is white
    isErrorStackFull?:boolean       // if set to true, logError will log the full stack trace
}
```




## Initialize the class

```ts
import { Logger } from "utils-logger-av"
```

You can export the default class like
```ts
const log = new Logger({ primaryColor:"cyan" });
export { log }
```


Or creating a new class extending mine to add some custom utilities
```ts
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
```


## Use the logger
You can now import the log object and call the related methods:
```ts
import { log } from "./your/filepath"; // I'm confident about your ide auto-import features

log.color("green", "Ciao")
log.base("Hello there, this is a log");
log.baseFile("Hello there", "log");
log.baseFile("An Error", "error");


log.orange("Another test", { test: 1, test2: true, prova: { test3: [ "Hello", 2, false] } }, false, 12.3);
log.white("This is white")
log.blue("This is blue")
log.brown("This is brown")
log.logError("This is an error", "err")
log.lime("This is lime")
log.teal("This is teal")
log.magenta("This is magenta")
```
