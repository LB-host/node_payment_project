const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.json({ message: "Welcome to test API." })
});

require("./app/routes/payment.routes.js")(app);


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});