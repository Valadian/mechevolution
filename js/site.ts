class Game{
    display:ROT.Display;
    data:{};
    map:ROT.Map;
    init(){
        var w = 150;
        var h = 80;
        ROT.RNG.setSeed(12354);
        this.display = new ROT.Display({width:w,height:h,fontSize:6});
        document.body.appendChild(this.display.getContainer());

        this.data = {};
        this.map = new ROT.Map.Uniform(w,h);
        this.map.create((x,y,value) => {
            this.data[x+","+y] = value;
            this.display.DEBUG(x,y,value);
        }) 
        var dijkstra = new ROT.Path.Dijkstra(93,38,(x,y)=>{
            return (this.data[x+",",y]==0);
        });
        dijkstra.compute(8,45, (x,y)=>{
            this.display.draw(x,y,"","","#800");
        });
        dijkstra.compute(130,8,(x,y)=>{
            this.display.draw(x,y,"","","#800");
        });

        this.display.draw(8,45,"","","#3f3");
        this.display.draw(130,8,"","","#3f3");
        this.display.draw(98,38,"","","#f33");
    }
}

let game = new Game();