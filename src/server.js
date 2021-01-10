require('dotenv').config()
const app = require('./app')
require('./database')

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`App is successfully listening on port ${port}`)
})
