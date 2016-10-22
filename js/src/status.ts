module bergecraft.rogue{
    export class Status{
        modeName:TextBuffer
        update(){
            var row1 = 1+Game.TEXT_HEIGHT+Game.MAP_SIZE.y;
            var row2 = 2+Game.TEXT_HEIGHT+Game.MAP_SIZE.y;
            // this.drawCharacters(1,row1," ",50,50);
            // this.drawCharacters(1,row2," ",50,50);
            Game.display.drawText(1,row1,"  Time: ",6);
            this.clearAndDrawText(10,row1,Game.scheduler.getTime().toString(),10);
            // Game.display.drawText(10,row1,PlayerMode[Game.player.mode],10);

            Game.display.drawText(1,row2,"Tool: ",6);
            Game.display.drawText(10,row2,Game.player.tool,10);

            Game.display.drawText(30,row1,"Health: ",6);
            //Game.display.drawText(40,row1,"%c{#f00}".rpad("o",8+Game.player.getStat("hp"))+"%c{}",10); //❤ 
            this.drawCharacters(40, row1,"\u2764",Game.player.getStat("hp"),10,"#f00")//,null,2

            Game.display.drawText(30,row2,"Armor  : ",6);
            //Game.display.drawText(40,row2,"%c{#999}".rpad("o",8+Game.player.getStat("defense"))+"%c{}",10); //⛊
            this.drawCharacters(40, row2,"\u26CA",Game.player.getStat("defense"),10,"#99f")//,null,2
            //Game.display.draw(40,row2,"⛊")
        }   
        clearAndDrawText(x:number, y:number, text:string, clearSize:number){
            this.drawCharacters(x,y," ",clearSize,clearSize);
            Game.display.drawText(x,y,text,clearSize);
        }
        drawCharacters(x:number,y:number,text:string, count:number, maxWidth:number, fg?:string, bg?:string, inc?:number){
            var inc = inc || 1;
            for(var i=0;i<maxWidth;i++) {
                if(i<count){
                    Game.display.draw(x+i*inc,y,text,fg,bg)
                } 
                else {
                    Game.display.draw(x+i*inc,y," ",fg,bg)
                }
            }
        }
    }
}