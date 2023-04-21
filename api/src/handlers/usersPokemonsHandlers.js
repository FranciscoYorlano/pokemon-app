// Controllers
const {} = require("../controllers/usersPokemonsControllers");

// ======================== User Handlers

const getUserPokemonsByUserId = (req, res) => {
    const { userId } = req.body;
    try {
        res.status(200).json(userId);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addNewUserPokemon = (req, res) => {
    const data = req.body;
    try {
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUserPokemon = (req, res) => {
    const data = req.body;
    try {
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUserPokemonsByUserId,
    addNewUserPokemon,
    deleteUserPokemon,
};
