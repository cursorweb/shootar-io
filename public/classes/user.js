class User {
    constructor(serial) {
        for (const key in serial) {
            this[key] = serial[key];
        }
    }

    draw(team, self = false) {
        fill(team);
        if (self) ellipse(width / 2, height / 2, 50, 50);
        else ellipse(this.x, this.y, 50, 50);

        push();
        textAlign(CENTER);
        textSize(20);
        strokeWeight(4);
        color(255);
        stroke(0);
        if (self) text(this.name, width / 2, height / 2 - 30);
        else text(this.name, this.x, this.y - 30);
        pop();
    }

    serialize() {
        let out = {};

        for (const key in this) {
            out[key] = this[key];
        }   

        return out;
    }

    set(obj) {
        this.x = obj.x;
        this.y = obj.y;
    }
}

function serializeUser(users, sockId) {
    let out = {};
    let user;

    for (let id in users) {
        if (id == sockId) user = users[id];
        else out[id] = new User(users[id]);
    }

    return [user, out];
}