module.exports.Bullet =
class Bullet {
    constructor(x, y, velx, vely) {
        this.x = x;
        this.y = y;
        this.velx = velx;
        this.vely = vely;
    }

    serialize() {
        return {
            x: this.x,
            y: this.y,
            velx: this.velx,
            vely: this.vely
        }
    }
}