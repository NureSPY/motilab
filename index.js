const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000;
const bodyParser= require('body-parser')

const Criterion = require('./routes/Criterion')
const Mark = require('./routes/Mark')
const Lpr = require('./routes/Lpr')
const Alternative = require('./routes/Alternative')
const Vector = require('./routes/Vector')
const pckJSON = require('./package.json')
app.use(bodyParser.json());

app.use('/criterion', Criterion)
app.use('/mark', Mark)
app.use('/alternative', Alternative)
app.use('/lpr', Lpr)
app.use('/vector', Vector)


server.listen(PORT,()=>{
    console.log(`${PORT}`);
})