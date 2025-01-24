// --- Logger
export type FileLogType = "log" | "error";
export type Icons =
    | "check"          // ✅ Check verde (OK)
    | "cross"          // ❌ Croce rossa (Errore)
    | "warning"        // ⚠ Simbolo di avvertimento
    | "info"           // ℹ Simbolo di informazione
    | "refresh"        // 🔄 Aggiornamento o processo in corso
    | "arrowRight"     // ➡ Freccia verso destra
    | "arrowLeft"      // ⬅ Freccia verso sinistra
    | "arrowUp"        // ⬆ Freccia verso l'alto
    | "arrowDown"      // ⬇ Freccia verso il basso
    | "doubleArrow"    // ↔ Freccia bidirezionale
    | "star"           // ⭐ Stella
    | "heart"          // ❤️ Cuore
    | "fire"           // 🔥 Fuoco
    | "lock"           // 🔒 Lucchetto
    | "unlock"         // 🔓 Lucchetto aperto
    | "hourglass"      // ⌛ Clessidra
    | "hourglassFlow"  // ⏳ Clessidra con sabbia che scorre
    | "rocket"         // 🚀 Razzo
    | "party"          // 🎉 Party popper
    | "search"         // 🔍 Lente di ingrandimento
    | "trash"          // 🗑 Cestino
    | "clip"           // 📎 Graffetta
    | "bulb"           // 💡 Lampadina
    | "checkBox"       // ☑ Casella selezionata
    | "pencil"         // ✏ Matita
    | "book"           // 📖 Libro
    | "folder"         // 📂 Cartella
    | "globe"          // 🌍 Globo (Europa/Africa)
    | "globeAmericas"  // 🌎 Globo (Americhe)
    | "globeAsia"      // 🌏 Globo (Asia/Australia)
    | "cloud"          // ☁ Nuvola
    | "sun"            // ☀ Sole
    | "moon"           // 🌙 Luna
    | "snowflake";     // ❄ Fiocco di neve

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

export interface LoggerConstructor {
    logFilePath?:string,
    debug?:boolean,
    locale?: DateLocales,
    primaryColor?:LogColors,
    isErrorStackFull?:boolean,
    areIconsBeforeText?:boolean,
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
