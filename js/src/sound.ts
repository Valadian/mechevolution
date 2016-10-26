module bergecraft.rogue{
    interface ISoundOptions{
        empty_reflectivity:number,
        solid_reflectivity:number,
        range_scalar:number,
        passes:number,
        emissionThreshold:number,//db
        shadowcastingAlgo:any,
        ambient:number, //dB
        dbToColor:number
    }
    export class SoundManager{
        // static config:ISoundOptions = {
        //     empty_reflectivity:0.2,
        //     solid_reflectivity:0.8,
        //     range_scalar:0.2,
        //     passes:2,
        //     emissionThreshold:10,
        //     shadowcastingAlgo:ROT.FOV.RecursiveShadowcasting,
        //     ambient:40,
        //     dbToColor:2
        // }
        static cfg:ISoundOptions = {
            empty_reflectivity:0,
            solid_reflectivity:0,//0.4
            range_scalar:0.15,
            passes:3,
            emissionThreshold:30,
            shadowcastingAlgo:ROT.FOV.RecursiveShadowcasting,
            ambient:20,
            dbToColor:2
        }
        makeSound(db:number,x:number, y:number,description:number){
            var soundData:{[id:string]:[number,number,number]} = {};
            var lightpasses = function(x, y) {
                return !(Game.level.solid(new Vector2(x,y)))
            }
            var fov = new SoundManager.cfg.shadowcastingAlgo(
                lightpasses, 
                {topology:4});
            var reflectivity = function (x, y) { 
                return Game.level.getCellAt(new Vector2(x,y)).sound_reflectivity;
            }
            var soundengine = new ROT.Lighting(
                reflectivity, 
                {range:SoundManager.cfg.range_scalar*db, passes:SoundManager.cfg.passes, emissionThreshold:SoundManager.cfg.emissionThreshold*SoundManager.cfg.dbToColor});
            
            soundengine.setFOV(fov);
            soundengine.setLight(x,y,[db*SoundManager.cfg.dbToColor,db*SoundManager.cfg.dbToColor,db*SoundManager.cfg.dbToColor])
            var soundcallback = function(x, y, color){
                soundData[new Vector2(x,y).toString()] = color
            }
            soundengine.compute(soundcallback);
            for(var id in soundData){
                var pos = Vector2.fromString(id)
                var localDb = soundData[id];
                var being = Game.level.getBeingAt(pos)
                var displayedData = (Game.display as any)._data[new Vector2(pos.x,pos.y+3).toString()];
                var bg = "#000"
                if(displayedData){
                    bg = displayedData[4];
                }
                Game.display.draw(pos.x,pos.y+3,"?",ROT.Color.toHex(localDb),bg);
                // if(being){

                // }
            }
        }
        makeSoundCustom(db:number, x:number, y:number){
            var soundData:{[id:string]:number} = {}
            var start = new Vector2(x,y);
            var dbm = Math.pow(2,db/10); 
            var soundRecursive = (dbm:number,xy:Vector2) => {
                soundData[xy.toString()]=dbm;
                this.draw(dbm,xy)
                //var adj:Vector2[] = [];
                for(var a_dir of ROT.DIRS[8]){
                    var diag = a_dir[0]!=0 && a_dir[1]!=0
                    var dir = new Vector2(a_dir[0],a_dir[1])
                    var next = xy.plus(dir);
                    var cell = Game.level.getCellAt(next);
                    var next_dbm = Math.floor(dbm * (diag?Math.pow(1-cell.dampening,1.414):1-cell.dampening));
                    
                    var curr_val = soundData[next.toString()];
                    if((curr_val==null || next_dbm>curr_val) && next_dbm>2 ){
                        soundRecursive(next_dbm,next);
                    }
                }
            }
            soundRecursive(dbm,start);
            
        }
        draw(dbm:number, pos:Vector2){
            var displayedData = (Game.display as any)._data[new Vector2(pos.x,pos.y+3).toString()];
            var db = Math.floor(Math.log(dbm)/Math.log(2)*10); 
            var bg = "#000"
            if(displayedData){
                bg = displayedData[4];
            }
            Game.display.draw(pos.x,pos.y+3,"?",ROT.Color.toHex([255-db*3,db*3,0]),bg);
        }
    }
}