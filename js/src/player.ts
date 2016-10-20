/// <reference path="being.ts" />
module bergecraft.rogue{
    export class Player extends Being{
        pos:Vector2;
        _keys:{};
        _promise:Promise = null;
        constructor(pos?:Vector2){
            super({ch:"B",fg:[0,255,0],description:"self"});

            this._char = "B";
            this._color = ROT.Color.fromString("green");

            this._keys = {};
            this._keys[ROT.VK_K] = 0;
            this._keys[ROT.VK_UP] = 0;
            this._keys[ROT.VK_NUMPAD8] = 0;
            this._keys[ROT.VK_U] = 1;
            this._keys[ROT.VK_PAGE_UP] = 1;
            this._keys[ROT.VK_NUMPAD9] = 1;
            this._keys[ROT.VK_L] = 2;
            this._keys[ROT.VK_RIGHT] = 2;
            this._keys[ROT.VK_NUMPAD6] = 2;
            this._keys[ROT.VK_N] = 3;
            this._keys[ROT.VK_PAGE_DOWN] = 3;
            this._keys[ROT.VK_NUMPAD3] = 3;
            this._keys[ROT.VK_J] = 4;
            this._keys[ROT.VK_DOWN] = 4;
            this._keys[ROT.VK_NUMPAD2] = 4;
            this._keys[ROT.VK_B] = 5;
            this._keys[ROT.VK_END] = 5;
            this._keys[ROT.VK_NUMPAD1] = 5;
            this._keys[ROT.VK_H] = 6;
            this._keys[ROT.VK_LEFT] = 6;
            this._keys[ROT.VK_NUMPAD4] = 6;
            this._keys[ROT.VK_Y] = 7;
            this._keys[ROT.VK_HOME] = 7;
            this._keys[ROT.VK_NUMPAD7] = 7;
        }
        act():Promise {
           // Progress.turns++;
            //Game.status.updatePart("turns");
            this._promise = new Promise();
            
            this._listen();
            return this._promise;
        }
        die() {
            super.die();
            Game.over();
        }
        handleEvent(e):any{
            if (e.ctrlKey || e.altKey) { return; }
	        if (e.keyCode == ROT.VK_SHIFT) { return; }

            window.removeEventListener("keydown", this);
            Game.text.clear();
	        var code = e.keyCode;

            if(code in this._keys){
                var direction = this._keys[code];
                var dir = ROT.DIRS[8][direction];
                var xy = this._pos.plus(new Vector2(dir[0], dir[1]));
                if (this._level.solid(xy)) { /* collision, noop */
                    var d = this._level.getCellAt(xy).getVisual().description;
                    if (d) { Game.text.write("You bump into %a.".format(this._level.getCellAt(xy))); }
                    return this._listen();
                } else { /* movement */
                    this._level.setBeing(this, xy);
                }
                return this._promise.fulfill();
            }
        }
        computeFOV() {
            var result = {};
            
            var level = this._level;
            var fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
                return !level.solid(new Vector2(x, y));
            });
            fov.compute(this._pos.x, this._pos.y, this.getStat("sight"), function(x, y, r, amount) {
                var xy = new Vector2(x, y);
                result[xy.toString()] = xy;
            });
            
            return result;
        }
        _listen(e?:any) {
            Game.text.flush();
            window.addEventListener("keydown", this);
        }
    }
}