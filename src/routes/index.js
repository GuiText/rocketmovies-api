const { Router } = require("express")
const routes = Router()

const usersRoutes = require("./users.routes")
const movieNotesRoutes = require("./movieNotes.routes")

// redirecionando requisição para a rota certa
routes.use("/users", usersRoutes)
routes.use("/notes", movieNotesRoutes)

module.exports = routes