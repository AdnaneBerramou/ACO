class Ant {
	constructor(cell, map) {
		this.state = "1";
		this.exploration = 0.8;
		this.evaporation = 0.9999;
		this.bruit = 0.7;
		this.cell = cell;
		this.map = map;
		this.lives = 3;
	}

	get N() {
		let x = this.cell.X;
		let y = this.cell.Y;
		let top = this.map.cellByData(x, y - 1);
		let left = this.map.cellByData(x + 1, y);
		let bottom = this.map.cellByData(x, y + 1);
		let right = this.map.cellByData(x - 1, y);

		return [top, left, bottom, right].filter(v => v !== null && v !== undefined).sort(() => Math.random() - 0.5);
	}

	getMaxV(N, V) {
		N.sort(() => Math.random() - 0.5);
		let toReturn = null;
		let curr = -Infinity;

		for (let i = 0; i < N.length; i++) {
			if (curr < N[i]["V" + V]) {
				toReturn = N[i];
				curr = N[i]["V" + V];
			}
		}

		return toReturn;
	}

	getAvgV(N, V) {
		return (1 / N.length) * N.map(v => v["V" + V]).reduce((a, b) => a + b);
	}

	setV() {
		const index = this.map.map.indexOf(this.cell);
		const typeCurrCell = this.cell.type;
		const V = this.state;
		let V1 =
			this.evaporation *
			(this.bruit * this.getMaxV(this.N, "1").V1 + (1 - this.bruit) * this.getAvgV(this.N, "1"));
		let V2 =
			this.evaporation *
			(this.bruit * this.getMaxV(this.N, "2").V2 + (1 - this.bruit) * this.getAvgV(this.N, "2"));

		if (typeCurrCell === "departure") {
			V1 = -1;
			V2 = 1;
		} else if (typeCurrCell === "arrival") {
			V1 = 1;
			V2 = -1;
		}
		this.map.map[index].V1 = V1;
		this.map.map[index].V2 = V2;
	}

	deliverFood() {
		this.lives--;
		this.state = "1";
		const index = this.map.map.indexOf(this.cell);
		this.map.map[index].delivredFood++;
	}

	pickFood() {
		this.state = "2";
		let index = this.map.map.indexOf(this.cell);
		this.map.map[index].foodLeft--;
		// if (this.map.map[index].foodLeft === 0) {
		// 	this.map.map[index].type = "empty";
		// 	this.map.map[index].dom.classList.remove("arrival");
		// 	let emptys = this.map.map.filter(v => v.type === "empty");
		// 	let newArrival = emptys[Math.floor(Math.random() * emptys.length)];
		// 	index = this.map.map.indexOf(newArrival);
		// 	this.map.map[index].type = "arrival";
		// 	this.map.map[index].foodLeft = 100;
		// 	this.map.map[index].dom.classList.add("arrival");
		// }
	}

	printV() {
		const V1 = this.cell.V1.toString().substring(0, 6);
		const V2 = this.cell.V2.toString().substring(0, 6);
		this.cell.dom.innerHTML =
			"<div class='cell-content'><span class='v1'>" + V1 + "</span>/<span class='v2'>" + V2 + "</span></div>";
	}

	move() {
		this.setV();
		// this.printV();
		const prevCell = this.cell;
		prevCell.dom.classList.add("ant-" + this.state);
		const N = this.N.filter(v => v.type !== "wall");

		if (Math.random() <= this.exploration) {
			let rand = Math.floor(Math.random() * N.length);
			this.cell = N[rand];
		} else {
			this.cell = this.getMaxV(N, this.state);
		}

		prevCell.dom.classList.remove("ant-1", "ant-2");
		const index = this.map.map.indexOf(this.map.map.filter((v, k, s) => v.foodLeft !== undefined)[0]);
		if (this.state === "1" && this.cell.type === "arrival" && this.map.map[index].foodLeft > 0) {
			this.pickFood();
		} else if (this.state === "2" && this.cell.type === "departure") {
			this.deliverFood();
		}

		this.cell.dom.classList.add("ant-" + this.state);
	}
}
