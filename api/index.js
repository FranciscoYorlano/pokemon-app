const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();

const { APP_PORT } = process.env;

conn.sync({ force: false }).then(() => {
    server.listen(APP_PORT, () => {
        console.log(`App listening at ${APP_PORT}`); // eslint-disable-line no-console
    });
});
