const { Router } = require("express");

// Handlers requires
const {
    getUserExistence,
    getUserById,
    createNewUser,
} = require("../handlers/usersHandler");

const usersRouter = Router();

// ======================== Pokemons Routes
usersRouter.get("", getUserExistence); // GET /users?email=EMAIL -> email existence

usersRouter.get("/:id", getUserById); // GET /users/:id -> User data

usersRouter.post("", createNewUser); // POST /users/ -> create new user

module.exports = usersRouter;