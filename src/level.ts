module bergecraft.rogue{
    export class Level{
        _beings = {};
        activate(){
            for (var p in this._beings) {
                Game.scheduler.add(this._beings[p], true);
            }
        }
    }
}