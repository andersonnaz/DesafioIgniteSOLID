import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class UserAlreadyExists extends Error {
  status = 400

  constructor() {
    super('User Already Exsists')
  }
}

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const {name, email} = request.body;
      const user = this.createUserUseCase.execute({email, name});
      return response.status(201).json(user);
    } catch (err) {
      const userAlreadyExistsError = new UserAlreadyExists()

      return response.status(userAlreadyExistsError.status).json({
        error: userAlreadyExistsError.message
      });
    }
  }
}

export { CreateUserController };
