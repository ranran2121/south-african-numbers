## Startup

This step is required to use the right node version

1. Ci in the project folder and set the proper node version according to the .nvmrc file

```bash
nvm use 18
```

3. Install the dependencies

```bash
yarn
```

4. Cd in the src directory and run the app

```bash
node index.js
```

5. Follow the instructions in the prompt

## About the app

This app is about checking if a number (typed by the user of contained in the provided file) is correctly formatted to be a valid South African number(27831234567 is the correct format for this
exercise).

When you run the app, a prompt will ask which service to invoke. By typing:

- 'c' is to allow the user to check a number of if choice. The console will tell the user if his input is correct, incorrect or if was amended and with which digits
- 's' is to allow the user to sort the numbers contained in a file stored in the files directory.The app sort those numbers in 3 files (one for correct, one for incorrect and one for the one that could be amended together with the digits used to correct the format)> the files are stored in the files directory and can be opened with a normal text editor.
- 'r' is to allow the user to chose which of the files created by the sorting algorithm to read in the console
- 'x' it to exit the process
