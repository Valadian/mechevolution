module bergecraft.rogue{
    export class Status{
        modeName:TextBuffer
        update(){
            var row1 = 1+Game.TEXT_HEIGHT+Game.MAP_SIZE.y;
            var row2 = 2+Game.TEXT_HEIGHT+Game.MAP_SIZE.y;
            Game.display.drawText(1,row1," ".rpad(" ",50),50);
            Game.display.drawText(1,row2," ".rpad(" ",50),50);
            Game.display.drawText(1,row1,"  Mode: ",6);
            Game.display.drawText(10,row1,PlayerMode[Game.player.mode],10);

            Game.display.drawText(1,row2,"Tool: ",6);
            Game.display.drawText(10,row2,Game.player.tool,10);

            Game.display.drawText(30,row1,"Health: ",6);
            Game.display.drawText(40,row1,"%c{#f00}".rpad("o",8+Game.player.getStat("hp"))+"%c{}",10); //❤ 

            Game.display.drawText(30,row2,"Armor  : ",6);
            Game.display.drawText(40,row2,"%c{#999}".rpad("o",8+Game.player.getStat("defense"))+"%c{}",10); //⛊
        }
    }
}