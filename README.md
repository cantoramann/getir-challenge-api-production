# Getir Challenge
 An Express & Mongo based API challenge by Getir.

## Executing Program
If you are not a tester, do not clone this repository. Server demo is up on https://toraman-getir-challenge.herokuapp.com/.

If you are a tester, you will need to change the MongoDB connection string in src/database.js manually.

### Endpoint
`api`: Post endpoint, to filter the data in the database.

## Request Body
| Input | Type | Required |
| --- | ----------- | ----------- |
| minCount | Number | Required |
| maxCount | Number | Required |
| startDate | Date (Preferably ISO 8601) | Required |
| endDate | Date (Preferably ISO 8601) | Required |

Above data should be sent in JSON format.

## Testing
In the root diretory, 'npm run test' command will run 23 Jest-based tests that include input validation and query filter operations. All tests are written inside a single file names api.test.js 

Test folder exists in the root directory.
