const express = require('express')
const app = express()
//const PORT = 3000
const mongoose = require('mongoose')
const {PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')
const path = require('path')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database Connected ...'))
    .catch((err) => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)
//app.get('/', (req,res) => res.send('Hello world'))

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client.dist'))
    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.group(`App listening at http:/localhost:${PORT}`))
