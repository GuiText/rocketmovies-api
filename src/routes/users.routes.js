const { Router } = require("express")
const usersRoutes = Router()

usersRoutes.post("/", (request, response) => {
  const { name, email, password } = request.body

  return response.json({ name, email, password })
})

module.exports = usersRoutes