const grid = document.getElementById("grid")

let pun = ["rozlepýš", "jágr", "tchůň", "žrahlt", "kudyzík", "vidamýžď", "metřid", "uchoun", "děsnýš", "stkraba", "mhlt", "srpatka", "snosl", "mokrk", "strejcůkřik"];
let animal = ["slepýš", "tygr", "tchoř", "žralok", "kamzík", "hlemýžď", "medvěd", "okoun", "hroznýš", "straka", "mlok", "kosatka", "sokol", "motýl", "tetřev"];

for (let i = 0; i < pun.length; i++) {
    const container = document.createElement("div");
    container.classList.add("container");
    grid.appendChild(container);

    const card = document.createElement("div");
    card.classList.add("card");
    container.appendChild(card);

    const front = document.createElement("div");
    front.classList.add("front");
    card.appendChild(front);
    front.innerHTML = (pun[i]);

    const back = document.createElement("div");
    back.classList.add("back");
    card.appendChild(back);
    back.innerHTML = (animal[i]);
};
