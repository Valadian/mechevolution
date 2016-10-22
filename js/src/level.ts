module bergecraft.rogue{
    export interface ILevel{
        drawMemory();
        setCell(cell:Cell,xy:Vector2);
        activate();
        deactivate();
        solid(xy:Vector2):boolean;
        draw(xy:Vector2);
        getSize():Vector2;
        isVisible(xy:Vector2):boolean;
        setBeing(being:Being, xy:Vector2);
        getCellAt(xy:Vector2):Cell;
        isInMap(xy:Vector2):boolean;
    }
    export abstract class Level implements ILevel{
        _size = Game.MAP_SIZE;
        _beings: { [id: string]: Being; } = {};
        _items: { [id: string]: Entity; } = {};
        _cells: { [id: string]: Cell; } = {};
        _free = {};
        _empty = Cell.empty;

        constructor(){
	        this._create();
        }
        _create(){
        }
        drawMemory(){}
        isVisible(xy:Vector2){return false;}
        setCell(cell:Cell,xy:Vector2) {
            if (cell) {
                this._cells[xy.toString()] = cell;
            } else {
                delete this._cells[xy.toString()];
            }
            this.draw(xy);
        }
        activate(){
            for (var p in this._beings) {
                Game.scheduler.add(this._beings[p], true);
            }
            
            Game.display.clear();
            this.drawMemory();
            //Game.status.update();
        }
        deactivate(){
            Game.scheduler.clear();
        }
        solid(xy:Vector2) {
            return (this._cells[xy.toString()] || this._empty).solid();
        }
        draw(xy:Vector2){
            if(this.isInMap(xy)){
                var visual = this._visualAt(xy);
                var bg = visual.bg||this._getBackgroundColor(xy); 
                Game.display.draw(xy.x, xy.y + Game.TEXT_HEIGHT, visual.ch, ROT.Color.toRGB(visual.fg), ROT.Color.toRGB(bg));
            }
        }
        isInMap(xy:Vector2){
            return xy.x>0 && xy.y>0 && xy.x<Game.MAP_SIZE.x && xy.y<Game.MAP_SIZE.y
        }
        _getBackgroundColor(xy:Vector2):[number,number,number] {
            return [255,255,255];
        }
        getSize(){
            return this._size;
        }
        _visualAt(xy:Vector2, excludeBeings?:boolean){
            var xys = xy.toString(); /* cache to optimize for speed */
	        return ((!excludeBeings && this._beings[xys]) || this._items[xys] || this._cells[xys] || this._empty).getVisual();
        }
        getBeingAt(xy:Vector2){
            return this._beings[xy.toString()] || null;
        }
        getItemAt(xy:Vector2){
            return this._items[xy.toString()] || null;
        }
        getCellAt(xy:Vector2) {
            return this._cells[xy.toString()] || this._empty;
        }
        setBeing(being:Being, xy:Vector2) {
            if (!being) { 
                delete this._beings[xy.toString()];
                if (Game.level == this) { this.draw(xy); }
                return;
            }

            /* remove from old position, draw */
            if (being.getLevel() == this) {
                var oldXY = being.getPosition();
                delete this._beings[oldXY.toString()];
                if (Game.level == this) { this.draw(oldXY); }
            }

            var cell = this._cells[xy.toString()];
            if (cell && cell.enter) { cell.enter(being); }

            being.setPosition(xy, this); /* propagate position data to the entity itself */

            /* set new position, draw */
            this._beings[xy.toString()] = being;
            if (Game.level == this) { this.draw(xy); }
        }

    }
}
module bergecraft.rogue.Level{
    export class Underground extends Level implements ILevel{
        _colors = [];
        _noise = new ROT.Noise.Simplex();
        _memory: { [id: string]: IVisual; } = {};
        _depth = 1; 
        _fov: { [id: string]: Vector2; } = {};
        constructor(depth:number){
            super();
            this._depth=depth;
            this._colors.push([100,100,100]);
            this._colors.push([200,200,200]);
        }
        _create(){
            this._createWalls();
            this._createMinerals(Cell.diamond,10);
            this._createMinerals(Cell.iron,50);
            this._createMinerals(Cell.copper,125);
            this._createMinerals(Cell.tin,125);
            this._createMinerals(Cell.quartz,20);
        }
        _createWalls(){
            for(var val in Game.data){
                switch(Game.data[val]){
                    case 0: //wall
                        this._cells[val] = Cell.wall;
                        break;
                    case 1:
                        this._cells[val] = Cell.empty;
                        break;
                }
                //this.draw(Vector2.fromString(val));
            }
        }
        _createMinerals(mineral:Cell,count:number ){
            for(var i = 0; i<count; i++){
                var pos = this._getRandomPos();
                if(pos && this.getCellAt(pos)==Cell.wall){
                    this._cells[pos.toString()] = mineral;
                }
            }
        }
        drawMemory() {
            this._fov = {};
            for (var xy in this._memory) {
                this._drawWeak(Vector2.fromString(xy), this._memory[xy]);
            }
        }
        isVisible(xy:Vector2) {
            return (xy.toString() in this._fov);
        }
        draw(xy:Vector2) {
            /* draw only when in player's FOV */
            if (xy.toString() in this._fov) { 
                return super.draw(xy); 
            }
        }
        setBeing(being:Being, xy:Vector2) {
            if (!being) { 
                delete this._beings[xy.toString()];
                if (Game.level == this) { this.draw(xy); }
                return;
            }

            /* remove from old position, draw */
            if (being.getLevel() == this) {
                var oldXY = being.getPosition();
                delete this._beings[oldXY.toString()];
                if (Game.level == this) { this.draw(oldXY); }
            }

            var cell = this._cells[xy.toString()];
            if (cell && cell.enter) { cell.enter(being); }

            being.setPosition(xy, this); /* propagate position data to the entity itself */

            if (being == Game.player) { this._updateFOV(being as Player); }

            /* set new position, draw */
            this._beings[xy.toString()] = being;
            if (Game.level == this) { this.draw(xy); }
        }
        _drawWeak(xy:Vector2, visual:IVisual) {
            if(this.isInMap(xy)){
                var fg = ROT.Color.interpolate([0, 0, 0], visual.fg, 0.5);
                var bg = visual.bg || this._getBackgroundColor(xy);
                Game.display.draw(xy.x, xy.y + Game.TEXT_HEIGHT, visual.ch, ROT.Color.toRGB(fg), ROT.Color.toRGB(bg));
            }
        }
        _updateFOV(being:Player) {
            var oldFOV = this._fov;
            this._fov = being.computeFOV();
            for (var id in this._fov) {
                var xy = this._fov[id];
                this._memory[xy.toString()] = this._visualAt(xy, true);

                if (id in oldFOV) { /* was visible, ignore */
                    delete oldFOV[id];
                } else { /* newly visible, draw */
                    this.draw(xy);
                }
            }
            
            for (var id in oldFOV) {
                var xy = oldFOV[id];
                var visual = this._visualAt(xy, true);
                this._drawWeak(xy, visual);
            }
        }
        _getBackgroundColor(xy:Vector2) {
            var val = this._noise.get(xy.x/20, xy.y/20)/2 + 0.5;
            return ROT.Color.interpolate(this._colors[0], this._colors[1], val);
        }
        getSpawn(){
            var pos = new Vector2(0,0);
            do{
                pos = this._getRandomPos();
            } while (Game.data[pos.toString()]!=1)
            return pos;
        }
        _getRandomPos(){
            var pos = new Vector2(0,0);
            pos.x = ROT.RNG.getUniformInt(0,Game.MAP_SIZE.x-1);
            pos.y = ROT.RNG.getUniformInt(0,Game.MAP_SIZE.y-1);
            return pos;
        }

    }
}