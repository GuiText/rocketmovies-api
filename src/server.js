require("express-async-errors")
const express = require("express")
const app = express()
const AppError = require("./utils/AppError")

app.use(express.json())

const routes = require("./routes")

const PORT = 3333

app.use(routes)

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))