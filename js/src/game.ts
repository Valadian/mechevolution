/// <reference path="vector2.ts" />
module bergecraft.rogue{
    export class Game{
	    static TEXT_HEIGHT = 3;
	    static STATUS_HEIGHT = 3;
	    static MAP_SIZE =  new Vector2(100, 30);
        static player:Player;
        static scheduler:ROT.Scheduler.Action;
        static engine:ROT.Engine;

        static display:ROT.Display;
        static data:{};
        static map:ROT.Map.Cellular;
        init(){
            var w = 150;
            var h = 80;
            //ROT.RNG.setSeed(12345);
            Game.display = new ROT.Display({width:w,height:h,fontSize:8});
            document.body.appendChild(Game.display.getContainer());

            Game.data = {};
            Game.map = new ROT.Map.Cellular(w,h);
            Game.map.randomize(0.2); 
            Game.map.create((x,y,value) => {
                Game.data[x+","+y] = value;
                Game.display.DEBUG(x,y,value);
            });
            new Promise((resolve, reject)=>{
                resolve(this.findClearSpot());
            }).then((pos:Vector2) => {
                Game.player = new Player(pos);
                Game.display.draw(Game.player.pos.x,Game.player.pos.y,"","","#3f3");
            });

        }
        findClearSpot() {
            var pos = new Vector2(0,0);
            do{
                pos.x = ROT.RNG.getUniformInt(0,Game.display.getOptions().width-1);
                pos.y = ROT.RNG.getUniformInt(0,Game.display.getOptions().height-1);
            } while (Game.data[pos.toString()]!=1)
            return pos;
        }
        handleEvent(e:any){
            switch(e.type){
                case "keypress":
                    
                    break;
            }
        }
    }
}
let game = new bergecraft.rogue.Game();