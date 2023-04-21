// Controllers
const {
    getUserByEmailController,
    getAllUsersController,
    createNewUserController,
} = require("../controllers/usersControllers");

// ======================== User Handlers

const getUserByEmail = async (req, res) => {
    const userData = req.body;

    try {
        const user = await getUserByEmailController(userData);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersController();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createNewUser = async (req, res) => {
    const user = req.body;

    try {
        const newUser = await createNewUserController(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUserByEmail,
    getAllUsers,
    createNewUser,
};
