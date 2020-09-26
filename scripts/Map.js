class Map {
    constructor(height = 10, width = 10, density = 5) {
        this.height = height;
        this.width = width;
        this.map = [];
        this.arrivalX = Math.floor(Math.random() * this.width);
        this.arrivalY = Math.floor(Math.random() * this.height);
        while (this.arrivalX === 0 && this.arrivalY === 0) {
            this.arrivalX = Math.floor(Math.random() * this.width);
            this.arrivalY = Math.floor(Math.random() * this.height);
        }
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (x === 0) {
                    this.map.push(new Cell('wall', null, null));
                }
                let type = (x === 0 && y === 0) ? 'departure': (x === this.arrivalX && y === this.arrivalY) ? 'arrival': (Math.random() * (this.height * 2) < density) ? 'wall': 'empty';
                this.map.push(new Cell(type, x, y));
                if (x === this.width - 1) {
                    this.map.push(new Cell('wall', null, null));
                }
            }
        }
        for (let i = 0; i < this.width + 2; i++) {
            this.map.unshift(new Cell('wall', null, null));
            this.map.push(new Cell('wall', null, null));
        }
    }

    cellByData(x, y) {
        return (this.map.filter(v => v.cellX === x && v.cellY === y)[0] === undefined)? null: this.map.filter(v => v.cellX === x && v.cellY === y)[0];
    }

    get domMap() {
        let map = document.createElement('div');
        map.classList.add('map');
        map.style.display = 'grid';
        map.style.gridTemplateColumns = 'auto '.repeat(this.width + 2);
        for (let i in this.map) {
            this.map[i].dom = document.querySelectorAll("[data-x='"+this.map[i].cellX+"'][data-y='"+this.map[i].cellY+"']")[0];
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = this.map[i].cellX;
            cell.dataset.y = this.map[i].cellY;
            cell.dataset.v1 = 0;
            cell.dataset.v2 = 0;
            cell.dataset.type = this.map[i].cellType;
            if(this.map[i].cellType === 'wall') {
                cell.classList.add('wall');
            } else {
                cell.innerHTML = '<div class="cell-content"><span class="v1">0</span>/<span class="v2">0</span></div>';
                if(this.map[i].cellType === 'departure') {
                    cell.classList.add('departure');
                } else if(this.map[i].cellType === 'empty') {
                    cell.classList.add('empty');
                } else if(this.map[i].cellType === 'arrival') {
                    cell.dataset.food = 100;
                    cell.classList.add('arrival');
                }
            }
            map.appendChild(cell);
        }
        return map;
    }
}

class Cell {
    constructor(type, x, y) {
        this.cellType = type;
        this.cellX = x;
        this.cellY = y;
        this.V1 = 0;
        this.V2 = 0;
        // this.dom = document.querySelectorAll("[data-x='"+x+"'][data-y='"+y+"']")[0];
        if (this.cellType === 'arrival') {
            this.foodLeft = 100;
        }
    }
}

let map = new Map(7, 17, 4);
document.body.appendChild(map.domMap);
console.log(map.map)