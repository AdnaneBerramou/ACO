const btn = document.getElementById("bI");
const pixelAnt = Map.drawAnt();
const msgP = document.getElementById("msg");

btn.after(pixelAnt);

btn.addEventListener("click", event => {
	event.preventDefault();
	noMsg();
	let xy = document.getElementById("hI").value;
	let dens = document.getElementById("dI").value;

	if (xy === "" || dens === "" || isNaN(xy) || isNaN(dens) || xy < 10 || xy > 50) {
		noMsg();
		handleError();
	} else {
		noMsg();
		btn.style.pointerEvents = "none";
		btn.disabled = true;
		document.querySelector(".map").remove();
		const map = new Map(parseInt(xy), parseInt(xy), parseInt(dens));
		const dom = map.domMap;
		const ants = [];
		const indexA = map.map.indexOf(map.map.filter(v => v.foodLeft !== undefined)[0]);
		const indexD = map.map.indexOf(map.map.filter(v => v.delivredFood !== undefined)[0]);

		dom.classList.add("offset-2", "col-8", "offset-lg-4", "col-lg-4");
		btn.after(dom);

		if (map.wave.includes(map.map[indexA]) || map.wave[0] === true) {
			for (let i = 0; i < 150; i++) {
				let ant = new Ant(map.cellByData(0, 0), map);
				ants.push(ant);
			}

			let loop = setInterval(() => {
				if (map.map[indexD].delivredFood >= 100 && map.map[indexA].foodLeft <= 0) {
					clearInterval(loop);
					btn.style.pointerEvents = "all";
					map.printPath();
					handleFinish();
					btn.disabled = false;
				} else {
					for (let i in ants) {
						if (ants[i].lives > 0) {
							ants[i].move();
						}
					}
				}
			}, 0);
		} else {
			handleError(
				"Pas de chemin possible, essayez de diminuer la densité de votre mappe (40% c'est déjà beaucoup)."
			);
			btn.style.pointerEvents = "all";
		}
	}
});

function handleError(
	msg = "Le données entrees ne sont pas valides, petit rappel, la taille de la mappe doit etre entre 10 et 50 unités (cellules), bien sur vous devez entrer des chiffres et rien d'autres, et normalement tout devrait bien se passer ;)."
) {
	const error = document.createElement("span");
	error.id = "error";
	error.innerHTML = msg;
	if (document.getElementById("error") === null) {
		msgP.appendChild(error);
	}
	btn.disabled = false;
}

function handleFinish(msg = "Les fourmis ont réussi à épuiser le stock de nourriture !") {
	const success = document.createElement("span");
	success.id = "success";
	success.innerHTML = msg;
	if (document.getElementById("success") === null) {
		msgP.appendChild(success);
	}
	btn.disabled = false;
}

function noMsg() {
	if (document.getElementById("error") !== null) {
		document.getElementById("error").remove();
	}
	if (document.getElementById("success") !== null) {
		document.getElementById("success").remove();
	}
}
