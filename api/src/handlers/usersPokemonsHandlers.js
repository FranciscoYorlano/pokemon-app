// Controllers
const {
    getUserPokemonsByUserIdController,
    addNewUserPokemonController,
    deleteUserPokemonController,
} = require("../controllers/usersPokemonsControllers");

// ======================== User Handlers

const getUserPokemonsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const userPokemons = await getUserPokemonsByUserIdController(id);
        console.log(userPokemons);
        res.status(200).json(userPokemons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addNewUserPokemon = async (req, res) => {
    const { data } = req.body;
    console.log(data);
    try {
        const status = await addNewUserPokemonController(data);
        res.status(200).json(status);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUserPokemon = async (req, res) => {
    const { pokemonId, userId } = req.query;
    const data = { pokemonId: pokemonId, userId: userId };
    try {
        const status = await deleteUserPokemonController(data);
        res.status(200).json(status);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUserPokemonsByUserId,
    addNewUserPokemon,
    deleteUserPokemon,
};
