const { hash } = require("bcryptjs")
const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")

class UsersController {
  async create(request, response) {
      const { name, email, password } = request.body

      const database = await sqliteConnection()

      const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      
      if(checkUsersExists) {
        throw new AppError("E-mail já cadastrado para outro usuário")
      }

      const hashedPassword = await hash(password, 8)
      
      await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [ name, email, hashedPassword ]
      )

      return response.status(201).json()

    }
}

module.exports = UsersController