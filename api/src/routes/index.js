const { Router } = require("express");

const pokemonsRouter = require("./pokemonsRouter");
const typesRouter = require("./typesRouter");

// ======================== Index router
const router = Router();

// ======================== Routers
router.use("/pokemons", pokemonsRouter);

router.use("/types", typesRouter);

router.use("*", (req, res) => {
    res.status(404).json({ error: "not found" });
});

module.exports = router;
