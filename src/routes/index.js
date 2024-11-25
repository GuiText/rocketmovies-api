const { Router } = require("express")
const routes = Router()
const usersRoutes = require("./users.routes")

// redirecionando requisição para a rota certa
routes.use("/users", usersRoutes)

module.exports = routes