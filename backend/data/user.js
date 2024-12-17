const bcrypt = require("bcryptjs");

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Yousuf Hassan",
        email: "yousuf@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Mr Ahmed Perfect",
        email: "ahmed@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

module.exports = users;
