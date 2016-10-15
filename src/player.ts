module bergecraft.rogue{
    export class Being{
        _char:string;
        _color:ROT.Color;
        _pos:Vector2
        constructor(pos:Vector2){
            this._pos = pos;
        }
        draw(){
            
        }
    }
    export class Player extends Being{
        pos:Vector2;
        _keys:{};
        constructor(pos:Vector2){
            super(pos);

            this._char = "J";
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
        handleEvent(e){
            if (e.ctrlKey || e.altKey) { return; }
	        if (e.keyCode == ROT.VK_SHIFT) { return; }

            window.removeEventListener("keydown", this);
	        var code = e.keyCode;

            if(code in this._keys){
                var direction = this._keys[code];
                var dir = ROT.DIRS[8][direction];
                var xy = this._pos.plus(new Vector2(dir[0], dir[1]));
            }
        }
    }
}