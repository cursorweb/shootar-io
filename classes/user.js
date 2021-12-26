module.exports.User =
class User {
    constructor(x, y, id) {
        this.health = 100;

        this.upgrades = [];

        this.level = 0;
        this.xp = 0;

        this.x = x;
        this.y = y;
        this.velx = 0;
        this.vely = 0;

        this.name = "";
        this.id = id;
    }

    set(user) {
        this.velx = user.velx;
        this.vely = user.vely;
    }

    serialize() {
        let out = {};

        for (const key in this) {
            out[key] = this[key];
        }

        return out;
    }
}

module.exports.update =
function update(users) {
    let out = {};

    for (let userId in users) {
        out[userId] = users[userId].serialize();
    }

    return out;
}