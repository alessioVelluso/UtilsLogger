// --- Logger
export type LogColors = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "gray" | null

export interface LoggerConstructor { logFilePath?:string, debug?:boolean, locale?: DateLocales, primaryColor?:LogColors }


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
