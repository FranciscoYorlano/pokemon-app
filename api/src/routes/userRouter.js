const { Router } = require("express");

// Handlers requires
const {
    getUserByEmail,
    getAllUsers,
    createNewUser,
} = require("../handlers/usersHandler");

const usersRouter = Router();

// ======================== Pokemons Routes
usersRouter.get("", getUserByEmail); // GET /users -> Complete user

usersRouter.get("/all", getAllUsers); // GET /users/all -> all users

usersRouter.post("", createNewUser); // POST /users/ -> create new user

module.exports = usersRouter;
