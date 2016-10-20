/// <reference path="entity.ts" />
module bergecraft.rogue{
    export abstract class Being extends Entity{
        _char:string;
        _color:ROT.Color;
        _pos:Vector2;
        _stats:{[id:string]:number} = {}
        constructor(visual:IVisual){
            super(visual);
            //this._pos = pos;
            Stats.all.forEach(function(name) {
                this._stats[name] = Stats[name].def;
            }, this);
        }
        getStat(name:string){
            return this._stats[name];
        }
        setStat(name:string,value:number){
            this._stats[name] = value;
            return this;
        }
        adjustStat(name:string, diff:number) {
            /* cannot use this.getStat(), might be modified by items */
            this.setStat(name, this._stats[name] + diff);
            return this;
        }
        /**
         * Called by the Scheduler
         */
        getSpeed() {
            return this.getStat("speed");
        }
        
        damage(damage) {
            this.adjustStat("hp", -damage);
            if (this.getStat("hp") <= 0) { this.die(); }
        }
        act(){}
        die() {
            this._level.setBeing(null, this._pos);
            Game.scheduler.remove(this);
        }
        setPosition(xy:Vector2, level:Level) {
            /* came to a currently active level; add self to the scheduler */
            if (level != this._level && level == Game.level) {
                Game.scheduler.add(this, true);
            }

            return super.setPosition(xy, level);
        }
        _attack(defender:Being) {
            var attack = this.getStat("attack");
            var defense = defender.getStat("defense");

            var abonus = ROT.RNG.getNormal(0, 3);
            var dbonus = ROT.RNG.getNormal(0, 3);
            
            console.log("Attack:", attack, "+", abonus, "vs.", defense, "+", dbonus);

            attack += abonus;
            defense += dbonus;
            attack = Math.max(1, attack);
            defense = Math.max(1, defense);

            var damage = Math.ceil(attack/defense) - 1;
            
            this._describeAttack(defender, damage);
            
            if (damage) { defender.damage(damage); }
        }
        _describeAttack(defender:Being, damage:number) {
            if (!this._level.isVisible(this._pos) || !this._level.isVisible(defender.getPosition())) { return; }

            if (damage) {
                var amount = Math.max(defender.getStat("hp")-damage, 0) / defender.getStat("maxhp");
                if (!amount) { /* dead */
                    var verb = ["kill", "destroy", "slaughter"].random();
                    Game.text.write(("%The %{verb,kill} %the.").format(this, this, defender));
                } else { /* hit */
                    var types = ["slightly", "moderately", "severly", "critically"].reverse();
                    amount = Math.ceil(amount * types.length) - 1;
                    Game.text.write(("%The %{verb,hit} %the and " + types[amount] +" %{verb,damage} %it.").format(this, this, defender, this, defender));
                } 
            } else {
                Game.text.write(("%The %{verb,miss} %the.").format(this, this, defender));
            }
        }
        _idle() {
            var xy = this._getAvailableNeighbors().random();
            if (xy) { this._level.setBeing(this, xy); }
        }
        _getAvailableNeighbors() {
            var result = [];
            ROT.DIRS[8].forEach(function(dir) {
                var xy = new Vector2(this._xy.x + dir[0], this._xy.y + dir[1]);
                if (this._level.blocks(xy) || this._level.getBeingAt(xy)) { return; }
                result.push(xy);
            }, this);
            return result;
        }
        draw(){
            
        }
    }
}