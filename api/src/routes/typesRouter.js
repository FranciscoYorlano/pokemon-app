const { Router } = require("express");

// Handlers requires
const { getAllTypesHandler } = require("../handlers/typesHandlers");

const typesRouter = Router();

// ======================== Types Routes

typesRouter.get("", getAllTypesHandler);

module.exports = typesRouter;
