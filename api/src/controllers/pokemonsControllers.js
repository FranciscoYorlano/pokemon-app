const axios = require("axios");

// PokeAPI
require("dotenv").config();
const { EXT_API_URL } = process.env;

// REGEX
const REGEX_URL =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// Models
const { Pokemon, Type, PokemonsTypes } = require("../db");
const { Op } = require("sequelize");

// ======================== Pokemons templates creators

const apiPokemonTemplateCreator = (pokemon) => {
    const types = pokemon.types.map((t) => t.type.name);

    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        life: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        types: types,
    };
};

const minifiedPokemonTemplateCreator = (pokemon) => {
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        attack: pokemon.attack,
        types: pokemon.types,
    };
};

const dbPokemonTemplateCreator = (pokemon) => {
    const types = pokemon.Types.map((t) => t.name);

    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        life: pokemon.life,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        types: types,
    };
};

// ======================== Pokemons Controllers

const getAllPokemons = async () => {
    // DB pokemons
    const query = await Pokemon.findAll({ include: Type });
    const dbPokemons = query.map((q) => dbPokemonTemplateCreator(q));

    // PokeApi pokemons
    const data = await axios.get(`${EXT_API_URL}/pokemon?limit=50`);
    const results = data.data.results;
    const apiPromises = results.map((r) => axios(r.url));
    const apiResponses = await Promise.all(apiPromises);
    const apiPokemons = apiResponses.map((r) => {
        return apiPokemonTemplateCreator(r.data);
    });

    const dbPokemonsMin = dbPokemons.map((p) =>
        minifiedPokemonTemplateCreator(p)
    );

    const apiPokemonsMin = apiPokemons.map((p) =>
        minifiedPokemonTemplateCreator(p)
    );

    return [...dbPokemonsMin, ...apiPokemonsMin];
};

const getPokemonsByName = async (name) => {
    const pokemonsDb = await Pokemon.findAll({
        where: { name: { [Op.iLike]: name } },
        include: Type,
    });

    const pokemons = pokemonsDb.map((pokemon) =>
        dbPokemonTemplateCreator(pokemon)
    );

    try {
        const response = await axios.get(
            `${EXT_API_URL}/pokemon/${name.toLowerCase()}`
        );
        if (response.data.name) {
            pokemons.push(apiPokemonTemplateCreator(response.data));
        }
    } catch (error) {}

    if (pokemons.length === 0) {
        throw new Error(`Name "${name}" not found.`);
    }
    return pokemons;
};

const getPokemonById = async (id, source) => {
    if (source === "apiExt") {
        try {
            const response = await axios.get(`${EXT_API_URL}/pokemon/${id}`);
            return apiPokemonTemplateCreator(response.data);
        } catch (error) {
            if (error.message === "Request failed with status code 404") {
                throw new Error(`Id "${id}" not found in ${source}`);
            } else {
                throw new Error(error.message);
            }
        }
    }

    if (source === "db") {
        const pokemon = await Pokemon.findByPk(id, { include: Type });
        if (pokemon === null) {
            throw new Error(`Id "${id}" not found in ${source}`);
        }

        return dbPokemonTemplateCreator(pokemon);
    }
};

const createNewPokemon = async (pokemon) => {
    const { name, image, life, attack, defense, speed, height, weight, types } =
        pokemon;

    if (!name) {
        throw new Error("Pokemon name is required.");
    }

    if (!image) {
        throw new Error("Pokemon image url is required.");
    }

    if (name.length > 20) {
        throw new Error(
            "Pokemon name should not be longer than 20 characters."
        );
    }

    if (!REGEX_URL.test(image)) {
        throw new Error("Pokemon image url is invalid.");
    }

    if (
        life < 0 ||
        attack < 0 ||
        defense < 0 ||
        speed < 0 ||
        height < 0 ||
        weight < 0
    ) {
        throw new Error("Pokemon stats must be greater than or equal to zero.");
    }

    if (types.length > 3) {
        throw new Error("Pokemon must not have more than 3 types.");
    }

    const typesCreated = await Type.findAll();
    const typeIdsCreated = typesCreated.map((type) => type.id);

    if (!types.every((t) => typeIdsCreated.includes(t))) {
        throw new Error("Pokemon types must be exist.");
    }

    // Creción de Pokemon
    const newPokemon = await Pokemon.create({
        ...pokemon,
        name: pokemon.name.replace(/\s(?=\w)/g, ""),
    });

    for (let i = 0; i < types.length; i++) {
        await PokemonsTypes.create({
            PokemonId: newPokemon.id,
            TypeId: types[i],
        });
    }

    // Return pokemon created
    const createdPokemon = await Pokemon.findByPk(newPokemon.id, {
        include: Type,
    });

    return minifiedPokemonTemplateCreator(
        dbPokemonTemplateCreator(createdPokemon)
    );
};

module.exports = {
    getAllPokemons,
    getPokemonsByName,
    getPokemonById,
    createNewPokemon,
};
