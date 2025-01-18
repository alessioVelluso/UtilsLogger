import { appendFileSync, existsSync, mkdirSync } from "fs";
import { DateLocales, FileLogType, LogColors, LoggerConstructor } from "../types/generic.types";

export interface ILogger {
    // log: (message:any, color?:LogColors) => void;
    // logColor: (coloredMessage:any, ...messages:any[]) => void;
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


export default class Logger implements ILogger
{
    private readonly logFilePath:string = null!;
    private readonly isDebug:boolean = true;
    protected readonly dateLocale:DateLocales = "it-IT";
    protected readonly primaryColor:LogColors = null;
    protected readonly isErrorStackFull:boolean = false;
    constructor(data?:LoggerConstructor) {
        if (data?.logFilePath) this.logFilePath = data.logFilePath;
        if (data?.debug) this.isDebug = data.debug;
        if (data?.locale) this.dateLocale = data.locale;
        if (data?.primaryColor) this.primaryColor = data.primaryColor;
        if (data?.isErrorStackFull !== undefined) this.isErrorStackFull = data.isErrorStackFull
    }





    protected readonly dateOptions: Intl.DateTimeFormatOptions | undefined = { day: '2-digit', month: '2-digit', year: 'numeric' };
    protected readonly timeOptions: Intl.DateTimeFormatOptions | undefined = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
    public readonly colors = {
        red: "\x1b[31m%s\x1b[0m",
        green: "\x1b[32m%s\x1b[0m",
        yellow: "\x1b[33m%s\x1b[0m",
        blue: "\x1b[34m%s\x1b[0m",
        magenta: "\x1b[35m%s\x1b[0m",
        cyan: "\x1b[36m%s\x1b[0m",
        gray: "\x1b[90m%s\x1b[0m",
        orange: "\x1b[38;5;214m%s\x1b[0m",
        pink: "\x1b[38;5;13m%s\x1b[0m",
        purple: "\x1b[38;5;93m%s\x1b[0m",
        teal: "\x1b[38;5;44m%s\x1b[0m",
        brown: "\x1b[38;5;94m%s\x1b[0m",
        lime: "\x1b[38;5;118m%s\x1b[0m",
        gold: "\x1b[38;5;220m%s\x1b[0m",
        violet: "\x1b[38;5;177m%s\x1b[0m"
    }


    protected getDateTimeString = () => {
        const dateObj = new Date();
        return `[${dateObj.toLocaleDateString(this.dateLocale, this.dateOptions)} ${dateObj.toLocaleTimeString(this.dateLocale, this.timeOptions)}]   `;
    }

    protected _log = (message:any, color:LogColors = null) => {
        if (!this.isDebug) return;

        const dateString = this.getDateTimeString();
        if (!color) console.log(`${dateString}${message}`);
        else {
            if (typeof message === "object") console.log(this.colors[color], `${dateString}${JSON.stringify(message, null, 2)}`);
            else console.log(this.colors[color], `${dateString}${message}`);
        }
    }





    logDetail = (...messages:any[]) => {
        if (!this.isDebug) return;

        for (const message of messages) {
            if (typeof message === "object") console.log(this.colors["gray"], JSON.stringify(message, null, 2));
            else console.log(this.colors["gray"], `${message}`);
        }
    }


    logError = (...errs:any) => {
        if (!this.isDebug) return;

        let errorMessage:string = null!;
        let stackTrace:string = null!;

        for(const err of errs) {
            if (err.message) errorMessage = err.message;
            if (err.stack) {
                if (this.isErrorStackFull) stackTrace = err.stack
                else stackTrace = err.stack.split("\n")[1];
            }

            if (!errorMessage) this._log(err, "red");
            else {
                this._log(errorMessage, "red")
                if (stackTrace) console.log(this.colors["gray"], stackTrace)
            }
        }
    }

    color = (color:LogColors, coloredMessage:any, ...messages:any[]) => {
        if (!this.isDebug) return;

        this._log(coloredMessage, color);
        for (let i = 0; i < messages.length; i++) {
            this.logDetail(messages[i]);
        }
    }


    base = (coloredMessage: any, ...messages: any[]) => this.color(this.primaryColor, coloredMessage, ...messages)
    white = (coloredMessage: any, ...messages: any[]) => this.color(null, coloredMessage, ...messages)
    green = (coloredMessage: any, ...messages: any[]) => this.color("green", coloredMessage, ...messages)
    yellow = (coloredMessage: any, ...messages: any[]) => this.color("yellow", coloredMessage, ...messages)
    blue = (coloredMessage: any, ...messages: any[]) => this.color("blue", coloredMessage, ...messages)
    magenta = (coloredMessage: any, ...messages: any[]) => this.color("magenta", coloredMessage, ...messages)
    cyan = (coloredMessage: any, ...messages: any[]) => this.color("cyan", coloredMessage, ...messages)
    gray = (coloredMessage: any, ...messages: any[]) => this.color("gray", coloredMessage, ...messages)
    orange = (coloredMessage: any, ...messages: any[]) => this.color("orange", coloredMessage, ...messages)
    pink = (coloredMessage: any, ...messages: any[]) => this.color("pink", coloredMessage, ...messages)
    purple = (coloredMessage: any, ...messages: any[]) => this.color("purple", coloredMessage, ...messages)
    teal = (coloredMessage: any, ...messages: any[]) => this.color("teal", coloredMessage, ...messages)
    brown = (coloredMessage: any, ...messages: any[]) => this.color("brown", coloredMessage, ...messages)
    lime = (coloredMessage: any, ...messages: any[]) => this.color("lime", coloredMessage, ...messages)
    gold = (coloredMessage: any, ...messages: any[]) => this.color("gold", coloredMessage, ...messages)
    violet = (coloredMessage: any, ...messages: any[]) => this.color("violet", coloredMessage, ...messages)


    logFile = (message:string, type:FileLogType = "log") => {
        if (!existsSync(this.logFilePath))
        {
            const buildingDirs = this.logFilePath.substring(0, this.logFilePath.lastIndexOf('/'));
            mkdirSync(buildingDirs, { recursive: true });
        }

        const date = this.getDateTimeString().trim();
        const logType = type === "log" ? "  LOG" : "ERROR"
        appendFileSync(this.logFilePath, `${date}\t\t${logType}:  ${message}\n`)
    }
}
