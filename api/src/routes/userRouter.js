const { Router } = require("express");

// Handlers requires
const {
    getUserByCredentials,
    getAllUsers,
    createNewUser,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

// ======================== Pokemons Routes
usersRouter.get("", getUserByCredentials); // GET /users -> Complete user

usersRouter.get("/all", getAllUsers); // GET /users/all -> All users

usersRouter.post("", createNewUser); // POST /users/ -> Create new user

module.exports = usersRouter;
