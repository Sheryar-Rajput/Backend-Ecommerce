const mongoose = require('mongoose')
const express = require('express') 
const app = express()
const db = require('./config/db')
const cors = require('cors')
app.use(cors({
  origin: '*'
})); 
db.connection.once('open', () => {
    console.log('db connected')
  })
  .on('error', (err) => {
    console.log('err in connecting Mongodb: ', err)
  })
  
  app.listen(process.env.PORT || 5000, () => {
    console.log('Listening to port: 5000 kesa hai!')
   
  })

app.use(express.json())
app.use('/' , require('./routes'))
