import { log } from "./utils";


// --- Logger
log.color("green", "Ciao")
log.base("Hello there, this is a log");
log.baseFile("Hello there", "log", false);
log.baseFile("An Error", "error");


log.orange("Another test", { test: 1, test2: true, prova: { test3: [ "Hello", 2, false] } }, false, 12.3);
log.white("This is white")
log.blue("This is blue")
log.brown("This is brown")
log.logError("This is an error", "err")
log.lime("This is lime")
log.teal("This is teal")
log.magenta("This is magenta")
