
# Uqoud  <img src="https://alhikmahinternational.org/classified/public/uqoud.png" alt="Uqoud" width="50" height="50">


Uqoud, is the region’s first cloud and on-prem solution for complete contract management. We strive to enable businesses to focus on their business while we worry about handling legally binding contracts, faster internal approval processes and easier procurement and marketing conversion cycles.

## Prerequisites

- Make sure that you have installed & created the MongoDB Database by following the steps mentioned in the `README.md` file at `mongodb-collections` branch.
- Make sure that all the collections have been imported.
- Make sure that the value of `MONGO_DB` variable in `config.env` file is updated. Put the updated MongoDB uri with your credentials. Here's the syntax:

```sh
    mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>/<DATABASE>?retryWrites=true&w=majority
```
`<USERNAME>`: Your MongoDB username.

`<PASSWORD>`: Your MongoDB password.

`<CLUSTER_NAME>`: The name of your MongoDB cluster.

`<DATABASE>`: The name of the MongoDB database which you created while MongoDB Installation.


## Deployment
Here's a step-by-step guide on deploying the Backend APIs on localhost.

- Install Node.js
Make sure you have Node.js installed on your local machine. You can download it from the official website and follow the installation instructions.

- Clone Repository
Clone the Repository of Backend-APIs in your computer.

- Install the Visual Studio Code

Install the Visual Studio Code Editor and Open your Project Folder in VS Code.

- Run the command
Open the New Terminal from the top menu and run the command npm install to install the required dependencies.

```sh
  npm install
```

- Then run the command

```sh
    npm run build
```

- After that you'll see the build folder.
- Move the upload folder to the build folder.

- Then run the command:
```sh
    cd build
```

- After that, run the command:
```sh
    npm start
```

- Visit http://localhost:8000 to make sure that the server is running.


```sh
http://localhost:8000
```
