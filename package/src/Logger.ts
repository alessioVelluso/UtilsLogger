import { appendFileSync, existsSync, mkdirSync } from "fs";
import { DateLocales, FileLogType, Icons, LogColors, LoggerConstructor } from "../types/generic.types";

export interface ILogger {
    // colors:Record<LogColors, string>; --- protected
    // icons:Record<Icons, string>; --- protected

    getStringedColor: (color:LogColors, message:any) => string;
    ok: (message:string) => void;
    nok: (message:string) => void;

    color: ([firstColor, firstMessage]:[LogColors | null, string], ...messages: string[]) => void;
    base: (coloredMessage:any, ...messages:any[]) => void;
    white: (coloredMessage:any, ...messages:any[]) => void;
    green: (coloredMessage:any,...messages:any[]) => void;
    red: (coloredMessage:any,...messages:any[]) => void;
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
    logDetail: (coloredMessage:any, ...messages:any[]) => void;
    logError: (coloredMessage:any,...errs:any[]) => void;
}


export default class Logger implements ILogger
{
    private readonly logFilePath:string = null!;
    private readonly isDebug:boolean = true;
    protected readonly dateLocale:DateLocales = "it-IT";
    protected readonly primaryColor:LogColors | null = null;
    protected readonly isErrorStackFull:boolean = false;
    protected readonly areIconsBeforeText:boolean = false;
    constructor(data?:LoggerConstructor) {
        if (data?.logFilePath) this.logFilePath = data.logFilePath;
        if (data?.debug) this.isDebug = data.debug;
        if (data?.locale) this.dateLocale = data.locale;
        if (data?.primaryColor) this.primaryColor = data.primaryColor;
        if (data?.isErrorStackFull !== undefined) this.isErrorStackFull = data.isErrorStackFull
        if (data?.areIconsBeforeText) this.areIconsBeforeText = data.areIconsBeforeText;

        this.colorsKeys = Object.keys(this.colors);
    }





    protected readonly dateOptions: Intl.DateTimeFormatOptions | undefined = { day: '2-digit', month: '2-digit', year: 'numeric' };
    protected readonly timeOptions: Intl.DateTimeFormatOptions | undefined = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
    protected readonly colorsKeys:string[];
    public readonly colors:Record<LogColors, string> = {
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
    public readonly icons: Record<Icons, string> = {
        check: "\u2705",          // ✅ Check verde (OK)
        cross: "\u274C",          // ❌ Croce rossa (Errore)
        warning: "\u26A0",        // ⚠ Simbolo di avvertimento
        info: "\u2139",           // ℹ Simbolo di informazione
        refresh: "\u1F504",       // 🔄 Aggiornamento o processo in corso
        arrowRight: "\u27A1",     // ➡ Freccia verso destra
        arrowLeft: "\u2B05",      // ⬅ Freccia verso sinistra
        arrowUp: "\u2B06",        // ⬆ Freccia verso l'alto
        arrowDown: "\u2B07",      // ⬇ Freccia verso il basso
        doubleArrow: "\u2194",    // ↔ Freccia bidirezionale
        star: "\u2B50",           // ⭐ Stella
        heart: "\u2764",          // ❤️ Cuore
        fire: "\u1F525",          // 🔥 Fuoco
        lock: "\u1F512",          // 🔒 Lucchetto
        unlock: "\u1F513",        // 🔓 Lucchetto aperto
        hourglass: "\u231B",      // ⌛ Clessidra
        hourglassFlow: "\u23F3",  // ⏳ Clessidra con sabbia che scorre
        rocket: "\u1F680",        // 🚀 Razzo
        party: "\u1F389",         // 🎉 Party popper
        search: "\u1F50D",        // 🔍 Lente di ingrandimento
        trash: "\u1F5D1",         // 🗑 Cestino
        clip: "\u1F4CE",          // 📎 Graffetta
        bulb: "\u1F4A1",          // 💡 Lampadina
        checkBox: "\u2611",       // ☑ Casella selezionata
        pencil: "\u270F",         // ✏ Matita
        book: "\u1F4D6",          // 📖 Libro
        folder: "\u1F4C2",        // 📂 Cartella
        globe: "\u1F30D",         // 🌍 Globo (Europa/Africa)
        globeAmericas: "\u1F30E", // 🌎 Globo (Americhe)
        globeAsia: "\u1F30F",     // 🌏 Globo (Asia/Australia)
        cloud: "\u2601",          // ☁ Nuvola
        sun: "\u2600",            // ☀ Sole
        moon: "\u1F319",          // 🌙 Luna
        snowflake: "\u2744",      // ❄ Fiocco di neve
    };


    protected _getDateTimeString = () => {
        const dateObj = new Date();
        return `[${dateObj.toLocaleDateString(this.dateLocale, this.dateOptions)} ${dateObj.toLocaleTimeString(this.dateLocale, this.timeOptions)}]   `;
    }

    protected _log = (message:any, color:LogColors | null = null) => {
        if (!this.isDebug) return;

        const dateString = this._getDateTimeString();
        if (!color) console.log(`${dateString}${message}`);
        else {
            if (typeof message === "object") console.log(this.colors[color], `${dateString}${JSON.stringify(message, null, 2)}`);
            else console.log(this.colors[color], `${dateString}${message}`);
            // if (typeof message === "object") console.log(this.colors[color].replace("%s", `${dateString}${JSON.stringify(message, null, 2)}`), );
            // else console.log(this.colors[color].replace("%s", `${dateString}${message}`));
        }
    }
    protected _color = (color:LogColors | null, coloredMessage:any, ...messages:any[]) => {
        if (!this.isDebug) return;

        this._log(coloredMessage, color);
        for (let i = 0; i < messages.length; i++) {
            this.logDetail(messages[i]);
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

    getStringedColor = (color:LogColors, message:any) => {
        if (typeof message === "object") return this.colors[color].replace("%s", `${JSON.stringify(message, null, 2)}`);
        else return this.colors[color].replace("%s", `${message}`)
    }
    color = ([firstColor, firstMessage]:[LogColors | null, string], ...messages: string[]) =>
    {
        if (!this.isDebug) return;
        let finalMessage:Array<LogColors | any> = [];
        finalMessage.push(firstColor === null ? `${this._getDateTimeString()}${firstMessage}` : this.colors[firstColor].replace("%s", `${this._getDateTimeString()}${firstMessage}`))
        for (const message of messages) finalMessage.push(message);

        console.log(...finalMessage);
    }

    ok = (message:string) => {
        if (!this.areIconsBeforeText) this._color("green", `${message}  \u2705`);
        else this._color("green", `${this.icons.check}  ${message}`);
    };

    nok = (message:string) => {
        if (!this.areIconsBeforeText) this._color("red", `${message}  \u274C`);
        else this._color("red", `${this.icons.cross}  ${message}`);
    };

    base = (coloredMessage: any, ...messages: any[]) => this._color(this.primaryColor, coloredMessage, ...messages)
    white = (coloredMessage: any, ...messages: any[]) => this._color(null, coloredMessage, ...messages)
    green = (coloredMessage: any, ...messages: any[]) => this._color("green", coloredMessage, ...messages)
    red = (coloredMessage: any, ...messages: any[]) => this._color("red", coloredMessage, ...messages)
    yellow = (coloredMessage: any, ...messages: any[]) => this._color("yellow", coloredMessage, ...messages)
    blue = (coloredMessage: any, ...messages: any[]) => this._color("blue", coloredMessage, ...messages)
    magenta = (coloredMessage: any, ...messages: any[]) => this._color("magenta", coloredMessage, ...messages)
    cyan = (coloredMessage: any, ...messages: any[]) => this._color("cyan", coloredMessage, ...messages)
    gray = (coloredMessage: any, ...messages: any[]) => this._color("gray", coloredMessage, ...messages)
    orange = (coloredMessage: any, ...messages: any[]) => this._color("orange", coloredMessage, ...messages)
    pink = (coloredMessage: any, ...messages: any[]) => this._color("pink", coloredMessage, ...messages)
    purple = (coloredMessage: any, ...messages: any[]) => this._color("purple", coloredMessage, ...messages)
    teal = (coloredMessage: any, ...messages: any[]) => this._color("teal", coloredMessage, ...messages)
    brown = (coloredMessage: any, ...messages: any[]) => this._color("brown", coloredMessage, ...messages)
    lime = (coloredMessage: any, ...messages: any[]) => this._color("lime", coloredMessage, ...messages)
    gold = (coloredMessage: any, ...messages: any[]) => this._color("gold", coloredMessage, ...messages)
    violet = (coloredMessage: any, ...messages: any[]) => this._color("violet", coloredMessage, ...messages)


    logFile = (message:string, type:FileLogType = "log") => {
        if (!existsSync(this.logFilePath))
        {
            const lastSlashIndex = this.logFilePath.lastIndexOf('/');

            if (lastSlashIndex !== -1) {
                const buildingDirs = this.logFilePath.substring(0, lastSlashIndex);
                mkdirSync(buildingDirs, { recursive: true });
            }
        }

        const date = this._getDateTimeString().trim();
        const logType = type === "log" ? "  LOG" : "ERROR"
        appendFileSync(this.logFilePath, `${date}\t\t${logType}:  ${message}\n`)
    }
}
