const { hash, compare } = require("bcryptjs")
const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")

class UsersController {
  async create(request, response) {
      const { name, email, password } = request.body

      const database = await sqliteConnection()

      // consulta emails cadastrados no db
      const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
      
      // verifica se email informado já existe em outro cadastro
      if(checkUsersExists) {
        throw new AppError("E-mail já cadastrado para outro usuário")
      }

      // pegando senha do usuário e criptografando
      const hashedPassword = await hash(password, 8)
      
      await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [ name, email, hashedPassword ]
      )

      return response.status(201).json()
    }
    
    async update(request, response) {
      const { name, email, password, old_password } = request.body
      const { id } = request.params

      const database = await sqliteConnection()
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

      if(!user) {
        throw new AppError("Usuário não cadastrado")
      }

      const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if(userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
        throw new AppError("E-mail já cadastrado para outro usuário ")
      }

      if(password && old_password) {
        const checkOldPassoword = await compare(old_password, user.password)

        if(!checkOldPassoword) {
          throw new AppError("Senha antiga inválida")
        }

        user.password = await hash(password, 8)
      }

      user.name = name
      user.email = email

      await database.run(`
          UPDATE users SET
          name = ?,
          email = ?,
          password = ?,
          updated_at = DATETIME('now')
          WHERE id = ?
        `,
        [user.name, user.email, user.password, id]
      )

      return response.json()
    }
}

module.exports = UsersController