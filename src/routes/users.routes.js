const { Router } = require("express")
const usersRoutes = Router()
const UsersController = require("../Controllers/UsersController")
const usersController = new UsersController()

// redirecionando a requisição feita na rota para o controller
usersRoutes.post("/", usersController.create)

module.exports = usersRoutes