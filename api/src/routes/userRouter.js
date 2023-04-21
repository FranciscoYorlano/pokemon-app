const { Router } = require("express");

// Handlers requires
const {
    getUserExistence,
    getUserById,
    getAllUsers,
    createNewUser,
} = require("../handlers/usersHandler");

const usersRouter = Router();

// ======================== Pokemons Routes
usersRouter.get("", getUserExistence); // GET /users?email=EMAIL -> email existence

usersRouter.get("/:id", getUserById); // GET /users/:id -> user data

usersRouter.get("/all", getAllUsers); // GET /users/all -> all users

usersRouter.post("", createNewUser); // POST /users/ -> create new user

module.exports = usersRouter;
