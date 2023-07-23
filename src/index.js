import { askService, followupQuestion } from "./cli.js";

/**
 * Check is the app has been initialized in the correct way according to the README file
 */
function run() {
  if (process.argv.length < 3) {
    askService(followupQuestion);
  } else {
    console.log("Invalid command");
  }
}

run();
