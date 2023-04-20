// Controllers
const {
    getAllPokemons,
    getPokemonsByName,
    getPokemonById,
    createNewPokemon,
} = require("../controllers/pokemonsControllers");

// ======================== Handlers

const getPokemonsHandler = async (req, res) => {
    const { name } = req.query;

    if (name) {
        // -> array de pokemons con name = name. Case insensitive

        try {
            const pokemons = await getPokemonsByName(name);
            res.status(200).json(pokemons);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        // -> array de pokemons (id, name, image, types)

        try {
            const pokemons = await getAllPokemons();
            res.status(200).json(pokemons);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const getPokemonByIdHandler = async (req, res) => {
    // -> pokemon con id = id (apto uuid)
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "apiExt";

    try {
        const pokemon = await getPokemonById(id, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createNewPokemonHandler = async (req, res) => {
    // -> create new pokemon
    const pokemon = req.body;

    try {
        const response = await createNewPokemon(pokemon);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    createNewPokemonHandler,
};
