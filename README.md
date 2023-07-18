## Startup

This step is required to use the right node version

1. Install yarn, if needed (run `npm install -g yarn`)
2. Create the _.env.local_ file and populate it accordingly to the current status of the project
3. create the _.nvmrc_ file in the root folder and populate it with the node versione (e.g. 18.0)
4. `nvm install` to install the proper npm verison according to the _.nvmrc_ file
5. `nvm use`
6. To intall the dependencies, run `yarn`

To run the APIs, run the following command and follow the prompts
`node index.js`

To run test, run the following command
`yarn test`
