// Models
const { UsersPokemons, User, Pokemon, Type } = require("../db");

// ======================== Templates creators
const minifiedPokemonTemplateCreator = (pokemon) => {
    return {
        id: pokemon.PokemonId,
        name: pokemon.Pokemon.name,
        image: pokemon.Pokemon.image,
        attack: pokemon.Pokemon.attack,
        life: pokemon.Pokemon.life,
        types: pokemon.Pokemon.Types.map((t) => t.name),
    };
};

// ======================== Regex
const REGEX_UUID =
    /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/i;

// ======================== User Controllers

const getUserPokemonsByUserIdController = async (id) => {
    if (!REGEX_UUID.test(id)) {
        throw new Error("User id is invalid");
    }
    const user = await User.findByPk(id, { attributes: ["username"] });
    if (user === null) {
        throw new Error("User not exist.");
    }

    const userPokemons = await UsersPokemons.findAll({
        where: { UserId: id },
        include: [
            {
                model: Pokemon,
                include: Type,
            },
        ],
    });

    const result = userPokemons.map((p) => minifiedPokemonTemplateCreator(p));

    return result;
};

const addNewUserPokemonController = async (data) => {
    const { userId, pokemonId } = data;

    if (!userId || !pokemonId) {
        throw new Error("Data is required.");
    }

    // User verification
    if (!REGEX_UUID.test(userId)) {
        throw new Error("User id is invalid");
    }

    const user = await User.findByPk(userId, { attributes: ["username"] });
    if (user === null) {
        throw new Error("User not exist.");
    }

    if (isNaN(pokemonId)) {
        // Pokemon verification
        if (!REGEX_UUID.test(pokemonId)) {
            throw new Error("Pokemon id is invalid");
        }

        const pokemon = await Pokemon.findByPk(pokemonId, {
            attributes: ["name"],
        });
        if (pokemon === null) {
            throw new Error("Pokemon not exist.");
        }

        // UserPokemon verification
        const isFav = await UsersPokemons.findOne({
            where: { UserId: userId, PokemonId: pokemonId },
        });

        if (isFav !== null) {
            throw new Error("Pokemons is already in user collection");
        }

        // Pokemon save to userPokemons
        const newUserPokemon = await UsersPokemons.create({
            PokemonId: pokemonId,
            UserId: userId,
        });

        return newUserPokemon;
    } else {
        throw new Error("Api pokemons can't be added to user collection.");
    }
};

const deleteUserPokemonController = async (data) => {
    const { userId, pokemonId } = data;

    if (!userId || !pokemonId) {
        throw new Error("Data is required.");
    }

    // User verification
    if (!REGEX_UUID.test(userId)) {
        throw new Error("User id is invalid");
    }

    const user = await User.findByPk(userId, { attributes: ["username"] });
    if (user === null) {
        throw new Error("User not exist.");
    }

    if (isNaN(pokemonId)) {
        // Pokemon verification
        if (!REGEX_UUID.test(pokemonId)) {
            throw new Error("Pokemon id is invalid");
        }

        const pokemon = await Pokemon.findByPk(pokemonId, {
            attributes: ["name"],
        });
        if (pokemon === null) {
            throw new Error("Pokemon not exist.");
        }

        // UserPokemon verification
        const userPokemon = await UsersPokemons.findOne({
            where: { UserId: userId, PokemonId: pokemonId },
        });

        if (userPokemon === null) {
            throw new Error("Pokemons is not in user collection");
        }

        // Pokemon delete
        try {
            await userPokemon.destroy();
            return { message: "Pokemon was removed from the user collection." };
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        throw new Error("Api pokemons can't be removed to user collection.");
    }
};

module.exports = {
    getUserPokemonsByUserIdController,
    addNewUserPokemonController,
    deleteUserPokemonController,
};
