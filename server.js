
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');


const indexRouter = require('./src/index');

// App
const app = express();


//express app setting
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/',indexRouter);
// app.use('/static', express.static(path.join(__dirname, 'public')))
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);