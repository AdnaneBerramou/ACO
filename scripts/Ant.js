class Ant {
    constructor(cell) {
        this.exploration = .8;
        this.confiance = .5;
        this.evaporation = .9999;
        this.bruit = .7;
        this.state = 1;
        this.cell = cell;
        this.pheromone = 0;
        this.lives = 3;
    }

    cellByData(x, y) {
        let cell = map.cellByData(x, y);
        return (cell === null) ? null : (cell.cellType === 'wall') ? null : cell;
    }

    getMaxV(N, V) {
        let toReturn = null;
        let curr = -Infinity;
        for (let i = 0; i < N.length; i++) {
            if (curr <= N[i]['V'+V]) {
                toReturn = N[i];
            }
        }
        return toReturn;
    }

    getAvgV(N, V) {
        return (1/4) * N.map(v=>v['V'+V]).reduce((a, b) => a + b);
    }

    setV() {
        console.log(this.state)
        const V = this.state;
        let undesirable = (V === 1)?'departure':'arrival';
        let desirable = (V === 1)?'arrival':'departure';
        map.map[map.map.indexOf(this.cell)]['V'+V] = (this.cell.cellType === undesirable)?-1
                                                        :(this.cell.cellType === desirable)?1
                                                        :(this.evaporation * (this.bruit * this.getMaxV(this.N, V)['V'+V]) + (1 - this.bruit) * this.getAvgV(this.N, V));
        let c = map.map[map.map.indexOf(this.cell)];
        let cell = document.querySelector('[data-x="'+c.cellX+'"][data-y="'+c.cellY+'"]');
        cell.innerHTML = '<div class="cell-content"><span class="v1">'+c.V1+'</span>/<span class="v2">'+c.V2+'</span></div>';
    }

    move() {
        this.setV();
        let cell = document.querySelector('[data-x="'+this.cell.cellX+'"][data-y="'+this.cell.cellY+'"]');
        cell.classList.add('ant-'+this.state);
        let prevCell = this.cell;
        let prevDomCell = cell;

        if(Math.random() <= this.exploration) {
            this.cell = this.N[Math.floor(Math.random() * this.N.length)];
        } else {
            this.cell = this.getMaxV(this.N, this.state);
        }

        cell = document.querySelector('[data-x="'+this.cell.cellX + '"][data-y="'+this.cell.cellY+'"]');
        prevDomCell.classList.remove('ant-1', 'ant-2');
        cell.classList.add('ant-' + this.state);
        if (this.state === 1) {
            if (this.cell.cellType === 'arrival') {
                console.log(this.cell)
                this.state = 2;
                map.map[map.map.indexOf(this.cell)].foodLeft--;
                prevDomCell.dataset.food = map.map[map.map.indexOf(this.cell)].foodLeft;
            }
        } else {
            if (this.cell.cellType === 'departure') {
                this.state = 1;
                this.lives--;
            }
        }
    }

    get N() {
        let x = this.cell.cellX;
        let y = this.cell.cellY;
        let top = this.cellByData(x, y-1);
        let left = this.cellByData(x+1, y);
        let bottom = this.cellByData(x, y+1);
        let right = this.cellByData(x-1, y);
        return [top, left, bottom, right].filter(v=>v!==null);
    }
}
const ants = [];
for (let i = 0; i < 100; i++) {
    let ant = new Ant(map.cellByData(0,0));
    ants.push(ant);
    ant.move();
}
// while(map.map[index].foodLeft > 0){
let c = 0;
while( c < 1000){
    for (const i in ants) {
        setTimeout(() => {
            if(ants[i].lives>0) {
                ants[i].move()
            }
        }, 1000);
    }
    c++;
}