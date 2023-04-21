// Controllers
const {} = require("../controllers/usersControllers");

// ======================== Handlers

const getUserExistence = async (req, res) => {
    const { email } = req.query;

    res.status(200).json({ email: email });
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({ id: id });
};

const createNewUser = async (req, res) => {
    const user = req.body;

    res.status(200).json({ user: user });
};

module.exports = {
    getUserExistence,
    getUserById,
    createNewUser,
};
