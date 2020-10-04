// document.getElementById("submitMap").addEventListener("click", event => {
// 	console.log(event);
const map = new Map(60, 60, 20);
const dom = map.domMap;
dom.classList.add("col-10");
const ants = [];
const indexA = map.map.indexOf(map.map.filter(v => v.foodLeft !== undefined)[0]);
const indexD = map.map.indexOf(map.map.filter(v => v.delivredFood !== undefined)[0]);

document.body.appendChild(dom);

if (map.wave.includes(map.map[indexA])) {
	for (let i = 0; i < 250; i++) {
		let ant = new Ant(map.cellByData(0, 0), map);
		ants.push(ant);
	}

	let loop = setInterval(() => {
		if (map.map[indexD].delivredFood >= 200 && map.map[indexA].foodLeft <= 0) {
			clearInterval(loop);
			map.printPath();
		} else {
			for (let i in ants) {
				if (ants[i].lives > 0) {
					ants[i].move();
				}
			}
		}
	}, 0);
} else {
	console.log("my bad :/");
}
// });
