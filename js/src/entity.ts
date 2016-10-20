module bergecraft.rogue{
    export interface IVisual{
        ch:string;
        fg:[number,number,number];
        bg?:[number,number,number];
        description?:string;
    }
    export class Entity{
        _visual:IVisual;
        _pos:Vector2;
        _level:ILevel;
        constructor(visual:IVisual){
            this._visual = visual;
        }
        getVisual(){
            return this._visual;
        }
        getPosition() {
            return this._pos;
        }
        getLevel() {
            return this._level;
        }
        setPosition(xy:Vector2, level:ILevel) {
            this._pos = xy;
            this._level = level;
            return this;
        }
        a() {
            var first = this._visual.description.charAt(0);
            return (first.match(/[aeiouy]/i) ? "an" : "a") + " " + this._visual.description;
        }

        the() {
            return "the " + this._visual.description;
        }

        it() {
            return "it";
        }

        verb(verb) {
            return verb + (verb.charAt(verb.length-1) == "s" ? "es" : "s");
        }
        toString() {
            return this._visual.description;
        }
    }
    String.format.map.a = "a";
    String.format.map.the = "the";
    String.format.map.verb = "verb";
    String.format.map.it = "it";
    String.format.map.h = "formatHelp";
}