import * as fs from "node:fs";
const CORRECT_NUMBERS = "./files/correct_numbers.txt";
const INCORRECT_NUMBERS = "./files/incorrect_numbers.txt";
const AMENDED_NUMBERS = "./files/amended_numbers.txt";
const ORIGINAL_NUMBERS = "./files/south_African_Mobile_Numbers.csv";

/**
 * Generate a random number between 0 and 9 (both included)
 * * @return {Number}  An integer between 1 and 9
 */
export const generateRandomNum = () => {
  return Math.floor(Math.random() * 9) + 1;
};

/**
 * Check the validity of the user's input in the terminal to choose a service. The input is request to be 1 or 2 or 3 only
 * @param  {String} choice Selector for the service
 * * @return {Boolean}  True or false
 */
export const isValidChoice = (choice) => {
  return choice === "1" || choice === "2" || choice === "3";
};

/**
 * Read the file indicated in the path works on the text inside to output the data in a specific format that can be used by other functions. Throws an error if the file is not found
 * @param  {String} path Selector for the file
 * * @return {Object[]}  and array of objects of the format {id: String, sms_phone: String}
 */
export const prepareData = (path) => {
  try {
    const input = fs
      .readFileSync(path)
      .toString()
      .split("\r\n")
      .map((line) => {
        line = line.split(",");
        return { id: line[0], sms_phone: line[1] };
      });
    input.shift();
    return input;
  } catch (e) {
    console.error("file not found");
    throw new Error("File not found");
  }
};

/**
 * Print the file indicated in the path on the console. Throws an error if the file is not found
 * @param  {String} path Selector for the file
 */
export const printData = (path) => {
  try {
    fs.readFileSync(path)
      .toString()
      .split("\n")
      .forEach((line) => {
        console.log(line);
      });
  } catch (e) {
    console.error("PrintData: file not found");
    throw new Error("File not found");
  }
};

/**
 * Delete all the files created after sorting the input data
 */
export const deleteFiles = () => {
  try {
    fs.unlinkSync(CORRECT_NUMBERS);
    fs.unlinkSync(INCORRECT_NUMBERS);
    fs.unlinkSync(AMENDED_NUMBERS);
  } catch (e) {
    console.error("old files not found");
  }
};

/**
 * Append an input to the file indicated by the argument. Logs and error if the write fails.
 * @param  {String} data the input to append
 * @param  {String} path Selector for the file
 */
export const writeFile = (data, path) => {
  try {
    fs.appendFileSync(path, `${data}\n`);
  } catch (e) {
    console.log("operation failed");
  }
};

/**
 * Select the file to print according to the user's input.
 * @param  {String} input the user's input
 */
export const readFile = (input) => {
  try {
    if (input === "1") {
      console.log(input);
      printData(CORRECT_NUMBERS);
    }
    if (input === "2") {
      printData(INCORRECT_NUMBERS);
    }
    if (input === "3") {
      printData(AMENDED_NUMBERS);
    }
  } catch (e) {
    console.log("Operation failed:  ");
  }
};

/**
 * Check if the number format is correct.
 * @param  {String} value The number to check
 * * @return {Boolean}  True or false
 */
export const isValidNumber = (value) => {
  let regex = /^27\d{9}$/i;
  return regex.test(value);
};

/**
 * Check if the number format is not correct.
 * @param  {String} value The number to check
 * * @return {Boolean}  True or false
 */
export const isInvalidNumber = (value) => {
  let regex1 = /^27\d{0,8}$/;
  let regex2 = /^7\d{0,9}$/i;
  return !regex1.test(value) && !regex2.test(value);
};

/**
 * Prepare the string that makes the number a correctly formatted one.
 * @param  {String} value The number to check
 * * @return {String}  The string that makes the number a correctly formatted one
 */
export const amendValue = (value) => {
  let amend = "";
  let diff = 11 - value.length;
  if (value.startsWith("27")) {
    for (let i = 0; i < diff; i++) {
      const n = String(generateRandomNum());
      amend += n;
    }
  } else {
    amend = "2 & ";
    for (let i = 0; i < diff - 1; i++) {
      const n = String(generateRandomNum());
      amend += n;
    }
  }
  return amend;
};

/**
 * Log the check of the user's input when the user wants to test a number of his choice.
 * @param  {String} value The number to check
 */
export const checkInputValue = (value) => {
  if (isValidNumber(value)) {
    console.log("correct format");
  } else if (isInvalidNumber(value)) {
    console.log("incorrect format");
  } else {
    const amend = amendValue(value);
    console.log("amended with " + amend);
  }
};

/**
 * Select the file where to append the number according to is the number is correct, not correct or amended
 * @param  {String} value the value to check
 */
export const checkFileValue = (value) => {
  try {
    if (isValidNumber(value)) {
      writeFile(value, CORRECT_NUMBERS);
    } else if (isInvalidNumber(value)) {
      writeFile(value, INCORRECT_NUMBERS);
    } else {
      const amend = amendValue(value);
      writeFile(`${value} amended with ${amend}`, AMENDED_NUMBERS);
    }
  } catch (err) {
    console.log("Operation failed");
  }
};

/**
 * Cycle through the input array and check every element
 * @param  {String[]} arr the list ot the values to check
 */
export const evaluateValues = (arr) => {
  for (let entry of arr) {
    checkFileValue(entry.sms_phone);
  }
};

/**
 * Extract the values from the original file, evaluates them and write them in the output files according to their format. Logs the success ot the operation
 */
export const createFiles = () => {
  try {
    const records = prepareData(ORIGINAL_NUMBERS);
    evaluateValues(records);
    console.log("Numbers sorted");
  } catch (err) {
    console.log("Operation failed");
  }
};
