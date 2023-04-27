/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
    name: "Pikachu",
    hp: 50,
    attack: 50,
    defense: 40,
    speed: 90,
};

describe("Pokemon routes", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        })
    );
    beforeEach(() =>
        Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
    );
    describe("GET /pokemons", () => {
        it("should get 200 and an array of pokemons", async () => {
            const res = await agent.get("/pokemons");
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
            expect(res.body[0]).to.have.property("name", "Pikachu");
        });
    });

    it("should get 200 and the specified pokemon", async () => {
        const pokemon = await Pokemon.create({
            name: "Bulbasaur",
            hp: 45,
            attack: 49,
            defense: 49,
            speed: 45,
        });
        const res = await agent.get(`/pokemons/${pokemon.id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("name", "Bulbasaur");
    });
    it("should get 404 if pokemon with specified id does not exist", async () => {
        const res = await agent.get(`/pokemons/123456789`);
        expect(res.status).to.equal(404);
    });
});
