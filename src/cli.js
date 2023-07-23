import {
  checkInputValue,
  isValidChoice,
  createFiles,
  readFile,
  deleteFiles,
} from "./services.js";

import * as readline from "node:readline";

/**
 * Create the readLine object to collect user's input
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Ask the user the service he wants to choose from a list of choices('c' to check a number, 's' to sort the numbers in the file, 'r' to read the generated files, 'x' to exit)
 * @param  {function} onResponse The callback
 */
export const askService = (onResponse) => {
  rl.question(
    "Enter the service ('c' to check a number, 's' to sort the numbers in the file, 'r' to read the generated files, 'x' to exit): ",
    onResponse
  );
};

/**
 * Select the next question to the user according to the user's input. Log the error message and ask again if the user's input is not included in the allowed choices
 * @param  {String} answer The users's input
 */
export const followupQuestion = (answer) => {
  if (answer == "c") {
    askNumber();
  } else if (answer == "s") {
    sort();
  } else if (answer == "r") {
    askFile();
  } else if (answer == "x") {
    rl.close();
  } else {
    console.log("Invalid choice. Please try again");
    askService(followupQuestion);
  }
};

/**
 * Ask the user the number he wants to check and check its format. Logs and error if the input is not a number and close the readline stream
 */
export const askNumber = () => {
  rl.question("Enter the number to check: ", (input) => {
    if (isNaN(input)) {
      console.log("Not a number. Please try again");
      askNumber();
    } else {
      checkInputValue(input);
      rl.close();
    }
  });
};

/**
 * Ask the user the file he wants to read and opens it. Logs and error if the user's choice is not in the allowed options
 */
export const askFile = () => {
  rl.question(
    "Enter the file you want to read ('1' for correct numbers, '2' for incorrect numbers, '3' for amended numbers): ",
    (input) => {
      if (isValidChoice(input)) {
        readFile(input);
        rl.close();
      } else {
        console.log("Invalid choice. Please try again");
        askFile(input);
      }
    }
  );
};

/**
 * Clean the files folder from the previous content and create the new files of correct, incorrect and amended numbers
 */
export const sort = () => {
  deleteFiles();
  createFiles();
  rl.close();
};
