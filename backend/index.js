const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res)=>{
  res.send(`Server is running on port: ${PORT}`)
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/product', ProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})
