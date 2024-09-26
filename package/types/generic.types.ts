// --- Logger
export type FileLogType = "log" | "error";
export type LogColors =
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "gray"
    | "orange"
    | "pink"
    | "purple"
    | "teal"
    | "brown"
    | "lime"
    | "gold"
    | "violet"
    | null

export interface LoggerConstructor {
    logFilePath?:string,
    debug?:boolean,
    locale?: DateLocales,
    primaryColor?:LogColors,
    isErrorStackFull?:boolean
}


// --- Locales
export type DateLocales =
    | "en-US"
    | "en-GB"
    | "fr-FR"
    | "de-DE"
    | "it-IT"
    | "es-ES"
    | "ja-JP"
    | "zh-CN";
