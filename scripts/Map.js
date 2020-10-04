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
