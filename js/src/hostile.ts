module bergecraft.rogue{
    export class Hostile extends DirectionalBeing{
        _idMap:{[id:string]:Being} = {};
        _aggroById:{[id:string]:number} = {};
        constructor(pos?:Vector2){
            super({ch:DirectionalBeing.CH_N,fg:[255,0,0],description:"hostile"});
            this._pos = pos;
        }
        act(){
            var fov = this.computeFOV();
            for(var xy in fov){
                var being = this._level.getBeingAt(Vector2.fromString(xy));
                if(being == Game.player){
                    this.addAggro(being,10);
                }
            }
            //handle noise in environment
            
            //decrement aggro (5/100)
            var decrement = -(Game.scheduler as any)._duration*5/100
            Object.keys(this._aggroById).forEach(
                (key)=> this.addAggro(key,decrement)
            );
            for(var id in this._aggroById){
                this.addAggro(id,decrement);
            }
            //move towards highest aggro
            var  target = this._findHighestAggro();
            //attack if next to player
        }
        addAggro(being:Being|string,value:number){
            var id:string;
            if(being instanceof Being){
                this._idMap[being.getId()] = being;
                id = being.getId();
            } else {
                id = (being as string)
            }
            this._aggroById[id]=Math.max(this._aggroById[id]+value,0);
        }
        _findHighestAggro(){
            var sortable = [];
            for (var id in this._aggroById)
                sortable.push([id, this._aggroById[id]])
            sortable.sort(
                function(a, b) {
                    return b[1] - a[1]
                }
            )
            var targetId = sortable[0];
        }
        damage(attacker:Being, damage:number){
            super.damage(attacker,damage);
            this._aggroById[attacker.getId()] += 10*damage;
        }
    }
}