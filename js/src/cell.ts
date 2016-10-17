/// <reference path="entity.ts" />
module bergecraft.rogue{
    interface IVisual{
        ch:string;
        fg:[number,number,number];
        description?:string;
    }
    export class Cell extends Entity{
        enter:Function;
        activate:Function;
        _solid:{};
        constructor(visual:IVisual,solid:boolean){
            super(visual);
            this._solid = solid;
        }
        solid(){
            return this._solid
        }
        static wall = new Cell({
            ch: "#",
            fg: [150,150,150],
            description: "rock"
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
            fg: [51, 51, 51]
        }, false);
    }
}