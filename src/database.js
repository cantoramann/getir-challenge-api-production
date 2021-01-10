const mongoose = require('mongoose')

const connect = async () => {
  console.log(process.env.MONGO_URI)
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Successfully connected to database')
  } catch (error) {
    console.log(error)
  }
}
connect()
