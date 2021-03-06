# Getir Challenge
 An Express & Mongo based API challenge by Getir.

## Executing Program
If you are not a tester, do not clone this repository. Server demo is up on https://toraman-getir-challenge.herokuapp.com/.


If you are a tester:

1. Download the code from GitHub, and in src/database.js replace the MONGO_URI with the actual value.

2. After, `npm start` or `npm run dev` command from the root will start the server on localhost. If you choose `npm run dev`, remove `env-cmd -f ./config/dev.env` code from `dev` script in `package.json`.

## Endpoint
`/api`: Post endpoint, to filter the data in the database (either from localhost or toraman-getir-challenge.herokuapp.com.

## Request Body
| Input | Type | Required |
| --- | ----------- | ----------- |
| minCount | Number | Required |
| maxCount | Number | Required |
| startDate | Date (Preferably ISO 8601) | Required |
| endDate | Date (Preferably ISO 8601) | Required |

Above data should be sent in JSON format.

## Testing
In `package.json`, remove `env-cmd -f ./config/test.env` code from `test` script.

In the root diretory, `npm run test` command will run 23 Jest-based tests that include input validation and query filter operations. All tests are written inside a single file named api.test.js 

Test folder exists in the root directory.
