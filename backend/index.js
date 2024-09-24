require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student_routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use('/api', studentRoutes);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});