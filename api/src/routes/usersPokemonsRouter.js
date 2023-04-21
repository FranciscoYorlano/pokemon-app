const { Router } = require("express");

// Handlers requires
const {
    getUserPokemonsByUserId,
    addNewUserPokemon,
    deleteUserPokemon,
} = require("../handlers/usersPokemonsHandlers");

const usersPokemonsRouter = Router();

// ======================== Pokemons Routes
usersPokemonsRouter.get("/:id", getUserPokemonsByUserId); // GET /userspokemons -> get all usersPokemons by user id

usersPokemonsRouter.post("", addNewUserPokemon); // POST /userspokemons -> add new user pokemon

usersPokemonsRouter.delete("", deleteUserPokemon); // DELETE /userspokemons -> delete user pokemon

module.exports = usersPokemonsRouter;
