const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
//starting app
const app = express()

//THIS CODE WORKS PERFECTLY FINE

// var API_KEY = '2d52391faceba52b385d9302752fc66b-6ae2ecad-f9858107';
// var DOMAIN = 'exercisemaphub.com';
// var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

// const data = {
//   from: 'Daniel <daniel@exercisemaphub.com>',
//   to: 'ventura.daniel36@gmail.com',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!'
// };

// mailgun.messages().send(data, (error, body) => {
//   console.log(error);
// });


//connect to mongo
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));

//importing routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

//app middleware
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV == 'development'){
    app.use(cors({origin: `http://localhost:3000`}))
}

//route middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)

const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

