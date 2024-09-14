import logger from "./utils";


// --- Logger

logger.log("Hello there, this is a log");
logger.logFile("Hello there", "log", false);
logger.logFile("An Error", "error");


logger.logColor("Another test", { test: 1, test2: true, prova: { test3: [ "Hello", 2, false] } }, false, 12.3);
