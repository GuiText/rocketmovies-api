const express = require("express")
const app = express()
app.use(express.json())

const routes = require("./routes")

const PORT = 3333

app.use(routes)

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))