/// <reference path="vector2.ts" />
module bergecraft.rogue{
    export class Game{
	    static TEXT_HEIGHT = 3;
	    static FONT_SIZE = 20;
	    static STATUS_HEIGHT = 3;
	    static MAP_SIZE =  new Vector2(150, 40);
        static player:Player;
        static scheduler:ROT.Scheduler.Action;
        static engine:ROT.Engine;
        static level:Level;
        static display:ROT.Display;
        static data:{};
        static map:ROT.Map.Cellular;
        static text:TextBuffer;
        static status:Status;
        static init(){
            //ROT.RNG.setSeed(12345);
            
			Game.player = new Player();
            Game.display = new ROT.Display({
                width:Game.MAP_SIZE.x,
                height:Game.MAP_SIZE.y+Game.TEXT_HEIGHT+Game.STATUS_HEIGHT,
                fontSize:Game.FONT_SIZE});
            document.body.appendChild(Game.display.getContainer());

            Game.data = {};
            Game.map = new ROT.Map.Cellular(Game.MAP_SIZE.x,Game.MAP_SIZE.y);
            Game.map.randomize(0.55); 
            Game.map.create((x,y,value) => {
                Game.data[x+","+y] = value;
                //Game.display.DEBUG(x,y,value);
            });


            Game.text = new TextBuffer();
            Game.text.configure({
                display: Game.display,
                position: new Vector2(0, 0),
                size: new Vector2(Game.MAP_SIZE.x, Game.TEXT_HEIGHT)
            });
            Game.text.clear();
            Game.text.write("[asdf] or [arrows] to move. [tab] to change mode")
            Game.status = new Status();
            // new Promise((resolve, reject)=>{
            //     resolve(this.findClearSpot());
            // }).then((pos:Vector2) => {
            //     Game.player = new Player(pos);
            //     Game.display.draw(Game.player.pos.x,Game.player.pos.y,"","","#3f3");
            // });
            Game._start();
            Game.status.update();
        }
        // static findClearSpot() {
        //     var pos = new Vector2(0,0);
        //     do{
        //         pos.x = ROT.RNG.getUniformInt(0,Game.MAP_SIZE.x-1);
        //         pos.y = ROT.RNG.getUniformInt(0,Game.MAP_SIZE.y-1);
        //     } while (Game.data[pos.toString()]!=1)
        //     return pos;
        // }
        static handleEvent(e:any){
            switch(e.type){
                case "keypress":
                    
                    break;
            }
        }
        static over(){

        }
        static _start() {
            Game.scheduler = new ROT.Scheduler.Action();
            Game.engine = new ROT.Engine(this.scheduler);

            /* build a level and position a player */
            var underground = new Level.Underground(1);
            this.switchLevel(underground, underground.getSpawn());
            Game.engine.start();
        }
        static switchLevel(level:Level, xy:Vector2) {
            if (this.level) { this.level.deactivate(); }
            this.level = level;
            this.level.activate();
            this.level.setBeing(this.player, xy);
        }
    }
}
let Game = bergecraft.rogue.Game.prototype;