class Map {
	constructor(height = 10, width = 10, density = 30) {
		this.height = height;
		this.width = width;
		this.density = density;
		this.map = [];
		this.arrivalX = Math.floor(Math.random() * this.width);
		this.arrivalY = Math.floor(Math.random() * this.height);
		this.wave = [];

		while (this.arrivalX === 0 && this.arrivalY === 0) {
			this.arrivalX = Math.floor(Math.random() * this.width);
			this.arrivalY = Math.floor(Math.random() * this.height);
		}

		this.drawMap();
		this.randWalls();
		this.pathExists();
	}

	drawMap() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (x === 0) {
					this.map.push(new Cell("wall", x - 1, y));
					if (y === 0) {
						for (let i = -1; i < this.width + 1; i++) {
							this.map.push(new Cell("wall", i, y - 1));
						}
					}
				}
				let type =
					x === 0 && y === 0 ? "departure" : x === this.arrivalX && y === this.arrivalY ? "arrival" : "empty";
				this.map.push(new Cell(type, x, y));
				if (x === this.width - 1) {
					this.map.push(new Cell("wall", x + 1, y));
					if (y === this.height - 1) {
						for (let i = -1; i < this.width + 1; i++) {
							this.map.push(new Cell("wall", i, y + 1));
						}
					}
				}
			}
		}
	}

	randWalls() {
		const emptyCells = this.map.filter(v => v.type === "empty");

		for (let l = 0; l < 50; l++) {
			emptyCells.sort(() => Math.random() - 0.5);
		}

		const walls = emptyCells.splice(0, Math.floor((this.density * emptyCells.length) / 100));

		for (let i in this.map) {
			if (walls.includes(this.map[i])) {
				this.map[i].type = "wall";
			}
		}
	}

	cellsAround(x, y, walls = true) {
		let around = [
			this.cellByData(x, y - 1),
			this.cellByData(x + 1, y),
			this.cellByData(x, y + 1),
			this.cellByData(x - 1, y),
		];
		if (walls === false) {
			around = around.filter(v => v.type !== "wall");
		}
		return around;
	}

	cellByData(x, y) {
		return this.map.filter(v => (v.X === x && v.Y === y ? v : null))[0];
	}

	get domMap() {
		let map = document.createElement("div");

		map.classList.add("map");
		map.style.display = "grid";
		map.style.gridTemplateColumns = "auto ".repeat(this.width + 2);

		for (let i in this.map) {
			let cell = document.createElement("div");
			cell.classList.add("cell");
			cell.id = "c" + this.map[i].X + "-" + this.map[i].Y;

			if (this.map[i].type === "wall") {
				cell.classList.add("wall");
			} else {
				// cell.innerHTML =
				// 	"<div class='cell-content'><span class='v1'>0</span>/<span class='v2'>0</span></div>";
				if (this.map[i].type === "departure") {
					cell.classList.add("departure");
				} else if (this.map[i].type === "empty") {
					cell.classList.add("empty");
				} else if (this.map[i].type === "arrival") {
					cell.classList.add("arrival");
				}
			}

			map.appendChild(cell);
		}
		return map;
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

	printPath() {
		const path = [this.cellByData(0, 0)];
		let cell = path[0];
		while (path.includes(this.map.filter(v => v.type === "arrival")[0]) === false) {
			cell = this.getMaxV(this.cellsAround(cell.X, cell.Y), "1");
			path.push(cell);
			cell.dom.style.backgroundColor = "yellow";
		}
	}

	pathExists(cell = this.cellByData(0, 0)) {
		if (this.density === 0) {
			this.wave = [true];
		} else {
			const around = this.cellsAround(cell.X, cell.Y, false);
			around.map(v => {
				if (this.wave.includes(v) === false) {
					this.wave.push(v);
					this.pathExists(v);
				}
				return v;
			});
		}
	}

	static drawAnt() {
		const draw = [
			"0 " + (7 + 3),
			"0 " + (8 + 3),
			"1 " + (2 + 3),
			"1 " + (4 + 3),
			"1 " + (6 + 3),
			"1 " + (7 + 3),
			"1 " + (8 + 3),
			"1 " + (9 + 3),
			"1 " + (11 + 3),
			"1 " + (13 + 3),
			"2 " + (2 + 3),
			"2 " + (5 + 3),
			"2 " + (6 + 3),
			"2 " + (7 + 3),
			"2 " + (8 + 3),
			"2 " + (9 + 3),
			"2 " + (10 + 3),
			"2 " + (13 + 3),
			"3 " + (2 + 3),
			"3 " + (5 + 3),
			"3 " + (6 + 3),
			"3 " + (7 + 3),
			"3 " + (8 + 3),
			"3 " + (9 + 3),
			"3 " + (10 + 3),
			"3 " + (13 + 3),
			"4 " + (3 + 3),
			"4 " + (6 + 3),
			"4 " + (7 + 3),
			"4 " + (8 + 3),
			"4 " + (9 + 3),
			"4 " + (12 + 3),
			"5 " + (4 + 3),
			"5 " + (7 + 3),
			"5 " + (8 + 3),
			"5 " + (11 + 3),
			"6 " + (5 + 3),
			"6 " + (6 + 3),
			"6 " + (7 + 3),
			"6 " + (8 + 3),
			"6 " + (9 + 3),
			"6 " + (10 + 3),
			"7 " + (3 + 3),
			"7 " + (4 + 3),
			"7 " + (5 + 3),
			"7 " + (6 + 3),
			"7 " + (7 + 3),
			"7 " + (8 + 3),
			"7 " + (9 + 3),
			"7 " + (10 + 3),
			"7 " + (11 + 3),
			"7 " + (12 + 3),
			"8 " + (2 + 3),
			"8 " + (5 + 3),
			"8 " + (6 + 3),
			"8 " + (7 + 3),
			"8 " + (8 + 3),
			"8 " + (9 + 3),
			"8 " + (10 + 3),
			"8 " + (13 + 3),
			"9 " + (1 + 3),
			"9 " + (4 + 3),
			"9 " + (7 + 3),
			"9 " + (8 + 3),
			"9 " + (11 + 3),
			"9 " + (14 + 3),
			"10 " + (0 + 3),
			"10 " + (3 + 3),
			"10 " + (6 + 3),
			"10 " + (7 + 3),
			"10 " + (8 + 3),
			"10 " + (9 + 3),
			"10 " + (12 + 3),
			"10 " + (15 + 3),
			"11 " + (0 + 3),
			"11 " + (2 + 3),
			"11 " + (5 + 3),
			"11 " + (6 + 3),
			"11 " + (7 + 3),
			"11 " + (8 + 3),
			"11 " + (9 + 3),
			"11 " + (10 + 3),
			"11 " + (13 + 3),
			"11 " + (15 + 3),
			"12 " + (1 + 3),
			"12 " + (4 + 3),
			"12 " + (5 + 3),
			"12 " + (6 + 3),
			"12 " + (7 + 3),
			"12 " + (8 + 3),
			"12 " + (9 + 3),
			"12 " + (10 + 3),
			"12 " + (11 + 3),
			"12 " + (14 + 3),
			"13 " + (1 + 3),
			"13 " + (4 + 3),
			"13 " + (5 + 3),
			"13 " + (6 + 3),
			"13 " + (7 + 3),
			"13 " + (8 + 3),
			"13 " + (9 + 3),
			"13 " + (10 + 3),
			"13 " + (11 + 3),
			"13 " + (14 + 3),
			"14 " + (1 + 3),
			"14 " + (4 + 3),
			"14 " + (5 + 3),
			"14 " + (6 + 3),
			"14 " + (7 + 3),
			"14 " + (8 + 3),
			"14 " + (9 + 3),
			"14 " + (10 + 3),
			"14 " + (11 + 3),
			"14 " + (14 + 3),
			"15 " + (4 + 3),
			"15 " + (5 + 3),
			"15 " + (6 + 3),
			"15 " + (7 + 3),
			"15 " + (8 + 3),
			"15 " + (9 + 3),
			"15 " + (10 + 3),
			"15 " + (11 + 3),
			"16 " + (4 + 3),
			"16 " + (5 + 3),
			"16 " + (6 + 3),
			"16 " + (7 + 3),
			"16 " + (8 + 3),
			"16 " + (9 + 3),
			"16 " + (10 + 3),
			"16 " + (11 + 3),
			"17 " + (4 + 3),
			"17 " + (5 + 3),
			"17 " + (6 + 3),
			"17 " + (7 + 3),
			"17 " + (8 + 3),
			"17 " + (9 + 3),
			"17 " + (10 + 3),
			"17 " + (11 + 3),
			"18 " + (5 + 3),
			"18 " + (6 + 3),
			"18 " + (7 + 3),
			"18 " + (8 + 3),
			"18 " + (9 + 3),
			"18 " + (10 + 3),
			"19 " + (6 + 3),
			"19 " + (7 + 3),
			"19 " + (8 + 3),
			"19 " + (9 + 3),
			"20 " + (7 + 3),
			"20 " + (8 + 3),
		];
		let map = document.createElement("div");
		map.classList.add("map", "offset-2", "col-8", "offset-lg-4", "col-lg-4");
		map.style.display = "grid";
		map.style.gridTemplateColumns = "auto ".repeat(21);
		for (let y = 0; y < 21; y++) {
			for (let x = 0; x < 21; x++) {
				let cell = document.createElement("div");
				cell.classList.add("cell");
				cell.id = "c" + x + "-" + y;
				if (draw.includes(y + " " + x)) {
					cell.classList.add("wall");
				} else {
					cell.classList.add("empty");
				}
				map.appendChild(cell);
			}
		}
		return map;
	}
}
