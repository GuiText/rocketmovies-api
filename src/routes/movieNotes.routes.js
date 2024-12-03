const { Router } = require("express")

const MovieNotesController = require("../Controllers/MovieNotesController")

const moviesNotesRoutes = Router()

const movieNotesController = new MovieNotesController()

moviesNotesRoutes.post("/:user_id", movieNotesController.create)
moviesNotesRoutes.get("/:id", movieNotesController.show)
moviesNotesRoutes.delete("/:id", movieNotesController.delete)
moviesNotesRoutes.get("/", movieNotesController.index)

module.exports = moviesNotesRoutes

