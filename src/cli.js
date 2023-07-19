import {
  checkInputValue,
  isValidChoice,
  createFiles,
  readFile,
  deleteFiles,
} from "./services.js";

import * as readline from "node:readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const askService = (onResponse) => {
  rl.question(
    "Enter the service ('c' to check a number, 's' to sort the numbers in the file, 'r' to read the generated files, 'x' to exit): ",
    onResponse
  );
};

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

export const askFile = () => {
  rl.question(
    "Enter the file you want to check ('1' for correct numbers, '2' for incorrect numbers, '3' for amended numbers): ",
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

export const sort = () => {
  deleteFiles();
  createFiles();
  rl.close();
};

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

askService(followupQuestion);
