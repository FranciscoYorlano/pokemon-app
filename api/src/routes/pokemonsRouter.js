const { Router } = require("express");

// Handlers requires
const {
    getPokemonsHandler,
    getPokemonByIdHandler,
    createNewPokemonHandler,
} = require("../handlers/pokemonsHandlers");

const pokemonsRouter = Router();

// ======================== Pokemons Routes
pokemonsRouter.get("", getPokemonsHandler);

pokemonsRouter.get("/:id", getPokemonByIdHandler);

pokemonsRouter.post("", createNewPokemonHandler);

module.exports = pokemonsRouter;
