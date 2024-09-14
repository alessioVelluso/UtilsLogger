﻿# Utils Logger Av



`v1.0.0`

This is a package i made for myself but can surely be helpful to others, feel free to contribute if you like it.



## Install:

```bash
npm install utils-logger-av
```

The Logger is just an exported class, the interface is as it follows:

```ts
interface IGenericUtils {
	log: (message:any, color:LogColors) => void;
    logColor: (coloredMessage:any, ...messages:any[]) => void;
    logDetail: (...messages:any[]) => void;
    logError: (...errs:any[]) => void;

    logFile: (message:string, type?:"log" | "error", isClosing?:boolean) => void;
}


private readonly fileStream:WriteStream = null!;
private readonly isDebug:boolean = true;
protected readonly dateLocale:DateLocales = "it-IT";
protected readonly primaryColor:LogColors = "cyan";
constructor(data?:LoggerConstructor) {
	if (data?.logFilePath) this.fileStream = createWriteStream(data.logFilePath, { flags: 'a' });
	if (data?.debug) this.isDebug = data.debug;
	if (data?.locale) this.dateLocale = data.locale;
	if (data?.primaryColor) this.primaryColor = data.primaryColor;
}
```




## Initialize the class

```ts
import { Logger } from "utils-logger-av"
```

You can simply initialize a new instance of my class or create a new one extending mine and overriding stuff.

```ts
const { log, logError } = new Logger();
export { log, logError }
```