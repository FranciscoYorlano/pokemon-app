// Controllers
const { getAllTypes } = require("../controllers/typesControllers");

// ======================== Handlers

const getAllTypesHandler = async (req, res) => {
    // -> array de types
    try {
        const types = await getAllTypes();
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllTypesHandler };
