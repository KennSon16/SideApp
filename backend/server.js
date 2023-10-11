// helps make .dotenv files to not expose any sensitive info
require('dotenv').config()
// express is backend framework
const express = require('express')
// mongoose is used to conne
const mongoose = require('mongoose');
// moved routes into their own folders for mvc architecture 
const taskRoute = require('./routes/taskRoute');
// middleware is good for hiding errors and locations (to make more secure)
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND

const app = express()

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes

app.get('/',(req, res) =>{
    res.send('Hello Node API')
})

app.use('/api/tasks', taskRoute)
// app.use('/api/users', userRoute)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

//using middleware
app.use(errorMiddleware);

//if theres a console display message that you dont wamt you can do
//mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Website API app listening on port ${PORT}`)
      })
    console.log(('connected to MongoDB'))
}).catch((error) => {
    console.log(error);    
});