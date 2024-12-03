const { Router } = require("express")

const MovieTagsController = require("../Controllers/MovieTagsController")

const moviesTagsRoutes = Router()

const movieTagsController = new MovieTagsController()

moviesTagsRoutes.get("/:user_id", movieTagsController.index)


module.exports = moviesTagsRoutes

