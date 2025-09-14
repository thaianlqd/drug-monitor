const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connectMongo = require('./server/database/connect');
const { notFoundHandler, errorHandler } = require('./server/middlewares/errorHandler');

app.set('view engine', 'ejs');

// Use body-parser to parse both URL-encoded and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Thêm để xử lý JSON từ Ajax

app.use(express.static('assets'));
app.use(morgan('tiny'));

connectMongo();

app.use('/', require('./server/routes/routes'));

// Error Handlers
app.use(notFoundHandler);   // Bắt 404
app.use(errorHandler);      // Bắt lỗi chung

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('listening on ' + PORT);
    console.log(`Welcome to the Drug Monitor App at http://localhost:${PORT}`);
});
