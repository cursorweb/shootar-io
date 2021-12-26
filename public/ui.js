window.onload = () => {
    const game = document.querySelector(".game");

    document.querySelectorAll(".start").forEach(el => {
        el.addEventListener("click", () => {
            let name = document.querySelector(".name").value.trim();

            socket.connect();
            socket.emit("name", name);
            game.style.display = "block";
        });
    });

    document.body.addEventListener("keydown", e => {
        if (e.key == "Enter") document.querySelector(".start").click();
    });
};