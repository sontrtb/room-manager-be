const user = require("./user");
const auth = require("./auth");
const category = require("./category");
const fluctuation = require("./fluctuation");
const total = require("./total");
const notification = require("./notification");

const routers = (app) => {

    app.use("/api/v1/user", user);
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/category", category);
    app.use("/api/v1/fluctuation", fluctuation);
    app.use("/api/v1/total", total);
    app.use("/api/v1/notification", notification);

    app.use("/", (req, res) => {
        return res.send("<h1>Server on</h1>")
    })
}

module.exports = routers