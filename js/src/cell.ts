/// <reference path="entity.ts" />
module bergecraft.rogue{
    export class Cell extends Entity{
        enter:Function;
        activate:Function;
        _solid:boolean;
        constructor(visual:IVisual,solid:boolean){
            super(visual);
            this._solid = solid;
        }
        solid():boolean{
            return this._solid
        }
        static wall = new Cell({
            ch: "",
            fg: [50,50,50],
            bg: [50,50,50],
            description: "stone wall"
        },true)
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