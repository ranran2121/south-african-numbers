## Startup

This step is required to use the right node version

1. `nvm install` to install the proper npm verison according to the _.nvmrc_ file
2. `nvm use`
3. To install the dependencies, run `yarn`
4. Cd in the src directory

To run the app, run the following command and follow the prompts
`node index.js`

This app is about checking is a number (typed by the user of contained in a file) is correctly format to be a valid South African number(27831234567 is the correct format for this
exercise).

When you run the app, a prompt will ask which service to invoke. By typing:

- 'c' is to allow the user to check a number of if choice. The console will tell the user if his input is correct, incorrect or if was amended and with which digits
- 's' is to allow the user to sort the numbers contained in a file stored in the files directory.The app sort those numbers in 3 files (one for correct, one for incorrect and one for the one that could be amended together with the digits used to correct the format)> the files are stored in the files directory and can be opened with a normal text editor.
- 'r' is to allow the user to chose which of the files created by the sorting algorithm to read in the console
- 'x' it to exit the process
