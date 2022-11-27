const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const password = process.env.PASSWORD_DB

const url = `mongodb+srv://fullstack:${password}@cluster0.3bklifx.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch((err) => console.log(err))
