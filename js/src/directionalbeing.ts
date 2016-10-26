module bergecraft.rogue{
    export abstract class DirectionalBeing extends Being{
        static CH_N = "\u25B2";
        static CH_NE = "\u25E5";
        static CH_E = "\u25B6";
        static CH_SE = "\u25E2";
        static CH_S = "\u25BC";
        static CH_SW = "\u25E3";
        static CH_W = "\u25C0";
        static CH_NW = "\u25E4";
        _ch_dirs = [DirectionalBeing.CH_N,
                          DirectionalBeing.CH_NE,
                          DirectionalBeing.CH_E,
                          DirectionalBeing.CH_SE,
                          DirectionalBeing.CH_S,
                          DirectionalBeing.CH_SW,
                          DirectionalBeing.CH_W,
                          DirectionalBeing.CH_NW];
        _direction:number = 0;
        _instant_rotation = false;
        _lastDuration = 100;

        static BASE_ROTATE_TIME = 50;
        static BASE_MOVE_TIME = 100;
        static BASE_MOVE_DIAGONAL_TIME = DirectionalBeing.BASE_MOVE_TIME * 1.41;
        static BASE_HIT_TIME = 300;
        static BASE_MISS_TIME = 150;
        constructor(visual:IVisual){
            super(visual)
        }
        _rotateTo(direction:number){
            var turns = this._turnsBetween(this._direction,direction);
            this._setRot(direction);
            this._level.setBeing(this,this._pos);
            Game.scheduler.setDuration(DirectionalBeing.BASE_ROTATE_TIME*turns);
        }
        _setRot(direction:number){
            this._direction = direction;
            this._visual.ch = this._ch_dirs[this._direction];
        }
        _turnsBetween(dir1:number, dir2:number){
            var onewayturns = Math.max(dir1,dir2)-Math.min(dir1,dir2)
            var otherwayturns = 8-onewayturns;
            return Math.min(onewayturns,otherwayturns);
        }
        computeFOV() {
            var result = {};
            
            var level = this._level;
            var fov = new ROT.FOV.RecursiveShadowcasting(function(x, y) {
                return !level.solid(new Vector2(x, y));
            });
            fov.compute90(this._pos.x, this._pos.y, this.getStat("sight"), this._direction, function(x, y, r, amount) {
                var xy = new Vector2(x, y);
                result[xy.toString()] = xy;
            });
            
            return result;
        }
    }
}