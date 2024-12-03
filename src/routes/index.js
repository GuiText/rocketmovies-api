const { Router } = require("express")
const routes = Router()

const usersRoutes = require("./users.routes")
const movieNotesRoutes = require("./movieNotes.routes")
const movieTagsRoutes = require("./movieTags.routes")

// redirecionando requisição para a rota certa
routes.use("/users", usersRoutes)
routes.use("/notes", movieNotesRoutes)
routes.use("/tags", movieTagsRoutes)

module.exports = routes