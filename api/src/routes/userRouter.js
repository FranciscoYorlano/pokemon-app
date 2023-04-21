const { Router } = require("express");

// Handlers requires
const {
    validateUserExisting,
    getUserById,
    createUser,
} = require("../handlers/userHandler");

const userRouter = Router();

// ======================== Pokemons Routes
userRouter.get("", validateUserExisting);

userRouter.get("/:id", getUserById);

userRouter.post("", createUser);

module.exports = pokemonsRouter;
