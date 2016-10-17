module bergecraft.rogue{
    export class Level{
        _size = Game.MAP_SIZE;
        _beings = {};
        _items = {};
        _cells = {};
        _free = {};
        _empty = Cell.empty;

        constructor(){
	        this._create();
        }
        activate(){
            for (var p in this._beings) {
                Game.scheduler.add(this._beings[p], true);
            }
        }
        _create(){
            
        }
    }
}