const AppError = require("../utils/AppError")

class UsersController {
  create(request, response) {
      const { name, email, password } = request.body

      // tratando erro se nome, email ou senha não forem informados
      if(!name || !email || !password) {
        throw new AppError("Nome e email e senha são obrigatórios para fazer o cadastro")
      }
    
      response.status(201).json({ name, email, password })
    }
}

module.exports = UsersController