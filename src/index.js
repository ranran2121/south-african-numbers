import { askService, followupQuestion } from "./cli.js";

function run() {
  if (process.argv.length < 3) {
    askService(followupQuestion);
  } else {
    console.log("Invalid command");
  }
}

run();
