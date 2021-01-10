const app = require('./app')
require('./database')
// require('dotenv').config()

console.log(process.env.PORT)
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`App is successfully listening on port ${port}`)
})
