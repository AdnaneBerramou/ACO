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
			"0 10", "0 11", "1 5", "1 7", "1 9", "1 10", "1 11", "1 12", "1 14", "1 16", "2 5", "2 8", "2 9", "2 10", "2 11", "2 12", "2 13", "2 16", "3 5", "3 8", "3 9", "3 10", "3 11", "3 12", "3 13", "3 16", "4 6", "4 9", "4 10", "4 11", "4 12", "4 15", "5 7", "5 10", "5 11", "5 14", "6 8", "6 9", "6 10",
			"6 11", "6 12", "6 13", "7 6", "7 7", "7 8", "7 9", "7 10", "7 11", "7 12", "7 13", "7 14", "7 15", "8 5", "8 8", "8 9", "8 10", "8 11", "8 12", "8 13", "8 16", "9 4", "9 7", "9 10", "9 11", "9 14", "9 17", "10 3", "10 6", "10 9", "10 10", "10 11", "10 12", "10 15", "10 18", "11 3", "11 5", "11 8",
			"11 9", "11 10", "11 11", "11 12", "11 13", "11 16", "11 18", "12 4", "12 7", "12 8", "12 9", "12 10", "12 11", "12 12", "12 13", "12 14", "12 17", "13 4", "13 7", "13 8", "13 9", "13 10", "13 11", "13 12", "13 13", "13 14", "13 17", "14 4", "14 7", "14 8", "14 9", "14 10", "14 11", "14 12", "14 13", "14 14",
			"14 17", "15 7", "15 8", "15 9", "15 10", "15 11", "15 12", "15 13", "15 14", "16 7", "16 8", "16 9", "16 10", "16 11", "16 12", "16 13", "16 14", "17 7", "17 8", "17 9", "17 10", "17 11", "17 12", "17 13", "17 14", "18 8", "18 9", "18 10", "18 11", "18 12", "18 13", "19 9", "19 10", "19 11", "19 12", "20 10", "20 11",
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
