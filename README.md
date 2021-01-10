# Getir Challenge
 An Express & Mongo based API challenge by Getir. This is the production repository.

## Executing Program
First, 'npm install' command will install all dependencies to the root.

After, 'npm run dev' command from the root will start the program indefinitely until the program is shut down manually.

## Environment Variables
Environment Variables are in a config folder, which is included in .gitignore.

Environment variables in the project are:
- Port (different for test.env and dev.env). Port can be specified in server.js file if wanted in app.listen() function, but is not required to. If not, the program will run on port 8000 in both development and testing modes.
- MongoDB driver URI, which is also obtained by the tester. It is only used in database.js, and needs to be changed manually by the tester.

## Testing
In the root diretory, 'npm run test' command will run 23 Jest-based tests that include input validation and query filter operations. All tests are written inside a single file names api.test.js 

Test folder exists in the root directory.