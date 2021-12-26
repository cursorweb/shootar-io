const socket = io({
    autoConnect: false
});

/** @type {User} */
let user;
let sockid;
/** @type {Record<String, User>} */
let users = {};

let keys = {};

let aWidth = 0, aHeight = 0;


socket.on("init", (u, w, h) => {
    user = new User(u);
    aWidth = w, aHeight = h;
});

socket.on("update", u => {
    let temp;
    [temp, users] = serializeUser(u, socket.id);
    user.set(temp);
});

socket.on("connect", () => {
    sockid = socket.id;
    console.log("joined as", socket.id);
});


function setup() {
    frameRate(60);
    createCanvas(500, 500).class("game");
    noStroke();
}

function draw() {
    if (!user) return;

    background(219);

    push();
    translate(width / 2 - user.x, height / 2 - user.y);
    fill(0);
    rect(0, 0, 500, 500);

    for (let id in users) {
        if (id == sockid) continue;

        users[id].draw("red");
    }

    pop();

    user.draw("blue", true);

    if (keys[UP_ARROW] || keys['w']) {
        user.vely = -1;
    }

    if (keys[DOWN_ARROW] || keys['s']) {
        user.vely = 1;
    }

    if (keys[LEFT_ARROW] || keys['a']) {
        user.velx = -1;
    }

    if (keys[RIGHT_ARROW] || keys['d']) {
        user.velx = 1;
    }
}

function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (!user) return;

    keys[keyCode] = true;
}

function keyReleased() {
    if (!user) return;

    keys[keyCode] = false;
    user.velx = 0;
    user.vely = 0;
}

// heartbeat
setInterval(() => {
    if (user) socket.emit("update", user.serialize());
}, 1000 / 60);