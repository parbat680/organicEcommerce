const express= require('express')
const mongoose= require('mongoose')
const app= express()
require('dotenv').config()



app.use(express.json())

const mongo_url= process.env.DATABASE_URL;

mongoose.connect(mongo_url)
const database= mongoose.connection

database.on('error',(error)=> {
    console.log('Error connecting database')
})

database.once('connected',(connected)=> {
    console.log('Database connected...')
})


const port = process.env.PORT || 5000;

// app.get('/',(req,res)=> {
//     res.send({message: 'hello'})
// })

app.listen(port, () => `Server running on port ${port} 🔥`);