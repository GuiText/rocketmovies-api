require("express-async-errors")
const express = require("express")
const app = express()
const AppError = require("./utils/AppError")

app.use(express.json())

const routes = require("./routes")

const PORT = 3333

// inicializando app, e redirecionando requisição para arota
app.use(routes)

// utilizando AppError para tratar erro tanto do lado do cliente quanto do server
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

// escutando minha porta
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))