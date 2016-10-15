import { Vector2 } from "vector2"
class Game{
    player:Player;
    scheduler:ROT.Scheduler<any>;
    engine:ROT.Engine;

    display:ROT.Display;
    data:{};
    map:ROT.Map.Cellular;
    init(){
        var w = 150;
        var h = 80;
        //ROT.RNG.setSeed(12345);
        this.display = new ROT.Display({width:w,height:h,fontSize:8});
        document.body.appendChild(this.display.getContainer());

        this.data = {};
        this.map = new ROT.Map.Cellular(w,h);
        this.map.randomize(0.5);
        this.map.create((x,y,value) => {
            this.data[x+","+y] = value;
            this.display.DEBUG(x,y,value);
        });
        var player = new Player(this.findClearSpot());
        this.display.draw(player.pos.x,player.pos.y,"","","#3f3");
    }
    findClearSpot():Vector2 {
        var start_x = ROT.RNG.getUniformInt(0,this.display.getOptions().width-1);
        var start_y = ROT.RNG.getUniformInt(0,this.display.getOptions().height-1);
        return new Vector2(start_x,start_y);
    }
}
class Player{
    pos:Vector2;
    constructor(pos:Vector2){
        this.pos = pos;
    }
}
let game = new Game();