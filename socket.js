const { User, update: serializeObj } = require("./classes/user");
const { random } = require("./util/rand");

let width = 500, height = 500; // as users increases, the bigger!
// each user = 10

/**
 * @type {Record<String, User}
 */
const users = {};

module.exports = io => {
    io.on("connection", socket => {
        const sockid = socket.id;

        console.log(sockid, "joined");
        const user = users[sockid] = new User(random(0, 500), random(0, 500), sockid);

        socket.on("name", name => {
            user.name = name;
        });

        socket.on("update", data => {
            user.set(data);
        });

        socket.emit("init", user.serialize(), width, height);
        
        socket.on("disconnect", () => {
            console.log(sockid, "left");
            delete users[sockid];
        });
    });

    setInterval(() => {
        // move users
        for (const id in users) {
            let user = users[id];

            user.x += user.velx;
            user.y += user.vely;

            if (user.x < 0) user.x = 0;
            if (user.x > width) user.x = width;
            if (user.y < 0) user.y = 0;
            if (user.y > height) user.y = height;
        }

        io.emit("update", serializeObj(users));
    }, 1000 / 60);
};