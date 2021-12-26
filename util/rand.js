module.exports.random = 
function random(min, max) {
    return Math.random() * (max - min) + min;
};