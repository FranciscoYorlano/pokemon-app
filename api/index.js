const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`App listening at ${PORT}`); // eslint-disable-line no-console
    });
});
