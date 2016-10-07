var Game = {
    display: null,
    data: null,
    map: null,
    init: function() {
        var w = 150, h = 80;
        ROT.RNG.setSeed(12345)
        this.display = new ROT.Display({width:w, height:h, fontSize:6});
        document.body.appendChild(this.display.getContainer());
        //SHOW(display.getContainer());

        this.data = {}
        this.map = new ROT.Map.Uniform(w,h);
        Game.map.create(function(x,y,value){
            Game.data[x+","+y] = value;
            Game.display.DEBUG(x,y,value);
        });

        var passableCallback = function(x,y){
            return (Game.data[x+","+y] === 0);
        }

        var dijkstra = new ROT.Path.Dijkstra(98,38, passableCallback);

        dijkstra.compute(8,45, function(x,y){
            Game.display.draw(x,y,"","","#800");
        });

        dijkstra.compute(130,8, function(x,y){
            Game.display.draw(x,y,"","","#800");
        });

        Game.display.draw(8,45,"","","#3f3");
        Game.display.draw(130,8,"","","#3f3");
        Game.display.draw(98,38,"","","#f33");
    }
}