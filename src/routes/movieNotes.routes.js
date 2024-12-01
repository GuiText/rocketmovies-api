const { Router } = require("express")

const MovieNotesController = require("../Controllers/MovieNotesController")

const moviesNotesRoutes = Router()

const movieNotesController = new MovieNotesController()

moviesNotesRoutes.post("/:user_id", movieNotesController.create)

module.exports = moviesNotesRoutes

