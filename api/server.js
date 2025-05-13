require("dotenv").config();

const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { DataCollector } = require("./utils/cryptoData");

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// autoupdate crypto data after every 34 minutes
// DataCollector();  
// setInterval(DataCollector, 2040000);  

app.use('/api', require("./routes"))

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
