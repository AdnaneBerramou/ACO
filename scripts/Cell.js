class Cell {
	constructor(type, x, y) {
		this.type = type;
		this.X = x;
		this.Y = y;
		this.V1 = 0;
		this.V2 = 0;
		this.id = "c" + x + "-" + y;

		if (this.type === "arrival") {
			this.foodLeft = 100;
		} else if (this.type === "departure") {
			this.delivredFood = 0;
		} else if (this.type === "wall") {
			this.V1 = -1;
			this.V2 = -1;
		}
	}

	get dom() {
		return document.getElementById(this.id);
	}
}
