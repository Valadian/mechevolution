module bergecraft.rogue{
    export class Vector2 { 
        x:number;
        y:number;
        constructor(x:number, y:number) {
            this.x = x||0;
            this.y = y||0;
        }
        fromString(str:string){
            var parts = str.split(",");
            return new Vector2(Number(parts[0]),Number(parts[1]));
        }
        toString(){
            return this.x+","+this.y;
        }
        is(xy:Vector2){
            return this.x==xy.x && this.y==xy.y;
        }
        dist8(xy){
            var dx = xy.x-this.x;
            var dy = xy.y-this.y;
            return Math.max(Math.abs(dx), Math.abs(dy));
        }
        dist4(xy) {
            var dx = xy.x-this.x;
            var dy = xy.y-this.y;
            return Math.abs(dx) + Math.abs(dy);
        }
        dist(xy) {
            var dx = xy.x-this.x;
            var dy = xy.y-this.y;
            return Math.sqrt(dx*dx+dy*dy);
        }
        plus(xy) {
            return new Vector2(this.x+xy.x, this.y+xy.y);
        }
        minus(xy) {
            return new Vector2(this.x-xy.x, this.y-xy.y);
        }
    }
}