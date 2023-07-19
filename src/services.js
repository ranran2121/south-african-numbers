import * as fs from "node:fs";
const CORRECT_NUMBERS = "./files/correct_numbers.txt";
const INCORRECT_NUMBERS = "./files/incorrect_numbers.txt";
const AMENDED_NUMBERS = "./files/amended_numbers.txt";
const ORIGINAL_NUMBERS = "./files/south_African_Mobile_Numbers.csv";

export const generateRandomNum = () => {
  return Math.floor(Math.random() * 10) + 1;
};

export const isValidChoice = (choice) => {
  return choice === "1" || choice === "2" || choice === "3";
};

export const prepareData = () => {
  try {
    const input = fs
      .readFileSync(ORIGINAL_NUMBERS)
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

export const deleteFiles = () => {
  fs.unlinkSync(CORRECT_NUMBERS);
  fs.unlinkSync(INCORRECT_NUMBERS);
  fs.unlinkSync(AMENDED_NUMBERS);
};

export const writeFile = (data, path) => {
  try {
    fs.appendFileSync(path, `${data}\n`);
  } catch (e) {
    console.log("operation failed");
  }
};

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
    console.log("operation failed");
  }
};

export const isValidNumber = (value) => {
  let regex = /^27\d{9}$/i;
  return regex.test(value);
};

export const isInvalidNumber = (value) => {
  let regex1 = /^27\d{0,8}$/;
  let regex2 = /^7\d{0,9}$/i;
  return !regex1.test(value) && !regex2.test(value);
};

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

export const sortValues = (arr) => {
  for (let entry of arr) {
    checkFileValue(entry.sms_phone);
  }
};

export const createFiles = () => {
  try {
    const records = prepareData();
    sortValues(records);
    console.log("Numbers sorted");
  } catch (err) {
    console.log("Operation failed");
  }
};
