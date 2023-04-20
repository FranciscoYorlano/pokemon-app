const axios = require("axios");

// PokeAPI
require("dotenv").config();
const { EXT_API_URL } = process.env;

// Models
const { Type } = require("../db");

// ======================== Types Controllers

const getAllTypes = async () => {
    const types = await Type.findAll();

    if (types.length === 0) {
        const data = await axios.get(`${EXT_API_URL}/type`);
        const types = data.data.results.map((t) => {
            return { name: t.name };
        });
        const newTypes = await Type.bulkCreate(types);
        return newTypes;
    }

    return types;
};

module.exports = { getAllTypes };
