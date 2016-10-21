/// <reference path="entity.ts" />
module bergecraft.rogue{
    export class Cell extends Entity{
        enter:Function;
        activate:Function;
        _solid:boolean;
        _hasStates:boolean;
        nextstate:Cell;
        constructor(visual:IVisual,solid:boolean,next?:Cell){
            super(visual);
            if(next){
                this.nextstate = next;
                this._hasStates = true;
            } else {
                this._hasStates = false;
            }
            this._solid = solid;
        }
        incrementState():Cell{
            if(this._hasStates){
                //this.currentState+=1;
                return this.nextstate;
            }
            return null;
        }
        // setState(state:number){
        //     if(this._hasStates){
        //         this.currentState = state;
        //         this._visual = this.states[state]
        //     }
        // }
        solid():boolean{
            return this._solid
        }
            // ch_states: ["","-","|","H","#"],
            // currentState: 0
        static wall_4 = new Cell({
            ch: "#",
            fg: [150,150,150],
            bg: [90,90,90],
            description: "stone wall (crumbling)"
        },true)
        static wall_3 = new Cell({
            ch: "X",
            fg: [150,150,150],
            bg: [80,80,80],
            description: "stone wall (damaged)"
        },true,Cell.wall_4)
        static wall_2 = new Cell({
            ch: "/",
            fg: [150,150,150],
            bg: [70,70,70],
            description: "stone wall (cracked)"
        },true,Cell.wall_3)
        static wall_1 = new Cell({
            ch: "-",
            fg: [150,150,150],
            bg: [60,60,60],
            description: "stone wall (scratched)"
        },true,Cell.wall_2)
        static wall = new Cell({
            ch: "",
            fg: [150,150,150],
            bg: [50,50,50],
            description: "stone wall"
        },true,Cell.wall_1)
        static diamond = new Cell({
            ch: "▼",
            fg: [185,242,355],
            description:"diamond"
        },true);
        static iron = new Cell({
            ch: "■",
            fg: [230,231,232],
            description:"iron"
        },true);
        static copper = new Cell({
            ch: "▬",
            fg: [184,115,51],
            description:"copper"
        },true);
        static tin = new Cell({
            ch: "▬",
            fg: [211,212,213],
            description:"tin"
        },true);
        static quartz = new Cell({
            ch: "♦",
            fg: [255,255,255],
            description:"quartz"
        },true);
        static empty = new Cell({
            ch: ".",
            fg: [151, 151, 151]
        }, false);
    }
}