const express = require("express")
const cors = require("cors")
const dbConnect = require("./utils/db");


const stripeRoutes = require("./routes/stripeRoutes");
const userRoutes = require("./routes/userRoutes")

require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());
dbConnect()

const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || 'localhost'

app.use("/user", userRoutes)
app.use("/stripe", stripeRoutes)

app.listen(PORT, (req, res) => {
    console.log(`App is listening to ${HOST}:${PORT}`)
})