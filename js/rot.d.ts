
//https://github.com/ondras/rot.js Oct 5, 2016

declare module ROT {
    function isSupported(): boolean;
    var DEFAULT_WIDTH: number;
    var DEFAULT_HEIGHT: number;
    var DIRS: number[][][];
    var VK_CANCEL: number;
    var VK_HELP: number;
    var VK_BACK_SPACE: number;
    var VK_TAB: number;
    var VK_CLEAR: number;
    var VK_RETURN: number;
    var VK_ENTER: number;
    var VK_SHIFT: number;
    var VK_CONTROL: number;
    var VK_ALT: number;
    var VK_PAUSE: number;
    var VK_CAPS_LOCK: number;
    var VK_ESCAPE: number;
    var VK_SPACE: number;
    var VK_PAGE_UP: number;
    var VK_PAGE_DOWN: number;
    var VK_END: number;
    var VK_HOME: number;
    var VK_LEFT: number;
    var VK_UP: number;
    var VK_RIGHT: number;
    var VK_DOWN: number;
    var VK_PRINTSCREEN: number;
    var VK_INSERT: number;
    var VK_DELETE: number;
    var VK_0: number;
    var VK_1: number;
    var VK_2: number;
    var VK_3: number;
    var VK_4: number;
    var VK_5: number;
    var VK_6: number;
    var VK_7: number;
    var VK_8: number;
    var VK_9: number;
    var VK_COLON: number;
    var VK_SEMICOLON: number;
    var VK_LESS_THAN: number;
    var VK_EQUALS: number;
    var VK_GREATER_THAN: number;
    var VK_QUESTION_MARK: number;
    var VK_AT: number;
    var VK_A: number;
    var VK_B: number;
    var VK_C: number;
    var VK_D: number;
    var VK_E: number;
    var VK_F: number;
    var VK_G: number;
    var VK_H: number;
    var VK_I: number;
    var VK_J: number;
    var VK_K: number;
    var VK_L: number;
    var VK_M: number;
    var VK_N: number;
    var VK_O: number;
    var VK_P: number;
    var VK_Q: number;
    var VK_R: number;
    var VK_S: number;
    var VK_T: number;
    var VK_U: number;
    var VK_V: number;
    var VK_W: number;
    var VK_X: number;
    var VK_Y: number;
    var VK_Z: number;
    var VK_CONTEXT_MENU: number;
    var VK_NUMPAD0: number;
    var VK_NUMPAD1: number;
    var VK_NUMPAD2: number;
    var VK_NUMPAD3: number;
    var VK_NUMPAD4: number;
    var VK_NUMPAD5: number;
    var VK_NUMPAD6: number;
    var VK_NUMPAD7: number;
    var VK_NUMPAD8: number;
    var VK_NUMPAD9: number;
    var VK_MULTIPLY: number;
    var VK_ADD: number;
    var VK_SEPARATOR: number;
    var VK_SUBTRACT: number;
    var VK_DECIMAL: number;
    var VK_DIVIDE: number;
    var VK_F1: number;
    var VK_F2: number;
    var VK_F3: number;
    var VK_F4: number;
    var VK_F5: number;
    var VK_F6: number;
    var VK_F7: number;
    var VK_F8: number;
    var VK_F9: number;
    var VK_F10: number;
    var VK_F11: number;
    var VK_F12: number;
    var VK_F13: number;
    var VK_F14: number;
    var VK_F15: number;
    var VK_F16: number;
    var VK_F17: number;
    var VK_F18: number;
    var VK_F19: number;
    var VK_F20: number;
    var VK_F21: number;
    var VK_F22: number;
    var VK_F23: number;
    var VK_F24: number;
    var VK_NUM_LOCK: number;
    var VK_SCROLL_LOCK: number;
    var VK_CIRCUMFLUX: number;
    var VK_EXCLAMATION: number;
    var VK_DOUBLE_QUOTE: number;
    var VK_HASH: number;
    var VK_DOLLAR: number;
    var VK_PERCENT: number;
    var VK_AMPERSAND: number;
    var VK_UNDERSCORE: number;
    var VK_OPEN_PAREN: number;
    var VK_CLOSE_PAREN: number;
    var VK_ASTERISK: number;
    var VK_PLUS: number;
    var VK_PIPE: number;
    var VK_HYPHEN_MINUS: number;
    var VK_OPEN_CURLY_BRACKET: number;
    var VK_CLOSE_CURLY_BRACKET: number;
    var VK_TILDE: number;
    var VK_COMMA: number;
    var VK_PERIOD: number;
    var VK_SLASH: number;
    var VK_BACK_QUOTE: number;
    var VK_OPEN_BRACKET: number;
    var VK_BACK_SLASH: number;
    var VK_CLOSE_BRACKET: number;
    var VK_QUOTE: number;
    var VK_META: number;
    var VK_ALTGR: number;
    var VK_WIN: number;
    var VK_KANA: number;
    var VK_HANGUL: number;
    var VK_EISU: number;
    var VK_JUNJA: number;
    var VK_FINAL: number;
    var VK_HANJA: number;
    var VK_KANJI: number;
    var VK_CONVERT: number;
    var VK_NONCONVERT: number;
    var VK_ACCEPT: number;
    var VK_MODECHANGE: number;
    var VK_SELECT: number;
    var VK_PRINT: number;
    var VK_EXECUTE: number;
    var VK_SLEEP: number;

    
    interface Size {
        width: number;
        height: number;
    }
    enum TokenType {
        TYPE_TEXT = 0,
        TYPE_NEWLINE,
        TYPE_FG,
        TYPE_BG
    }
    interface Token {
        type: TokenType;
        value: string;
    }
    export class Text {
        measure(str:string,maxWidth:number) : Size;
        tokenize(str: string,maxWidth:number) : Token[];
    }
    interface DisplayOptions{
        width?:number;
        height?:number;
        transpose?:boolean;
        layout?:string;
        fontSize?:number;
        spacing?:number;
        border?:number;
        forceSquareRatio?:boolean;
        fontFamily?:string;
        fontStyle?:string;
        fg?:string;
        bg?:string;
        tileWidth?:number;
        tileHeight?:number;
        tileMap?:any;//TODO:Array<Tile>
        tileSet?:any;//TODO
        tileColorize?:boolean;
        termColor?:string;
    }
    export class Display{
        DEBUG(x: number, y: number, value: number);
        constructor (options?:DisplayOptions);
        clear();
        setOptions(options:DisplayOptions);
        getOptions():DisplayOptions;
        getContainer():any;//todo canvas?
        computeSize(availWidth:number,availHeight:number):number[];
        computeFontSize(availWidth:number,availHeight:number):number;
        eventToPosition(e:any):number[];//TODO: event
        draw(x:number,y:number,ch:string|string[],fg?:string,bg?:string);
        drawText(x:number,y:number,text:string,maxWidth:number):number;
    }
    interface Dictionary<T> {
        [key:string]:T;
    }
    export class RNG{
        static getSeed():number;
        static setSeed(seed:number):RNG;
        static getUniform():number;
        static getUniformInt(lowerBound:number,upperBound:number):number;
        static getNormal(mean:number,stddev:number):number;
        static getPercentage():number;
        static getWeightedValue(data:Dictionary<number>):string;
        static getState():any[];
        static setState(state:any[]):RNG;
        clone():RNG;
    }
    interface StringGeneratorOptions{
        words:boolean;
        order:number;
        prior:number;
    }
    export class StringGenerator{
        constructor(options?:StringGeneratorOptions);
        clear();
        generate():string;
        observe(string:string);
        getStats():string;
    }
    export class EventQueue{
        getTime():number;
        clear():EventQueue;
        add(event:any,time:number):void;
        get():any|void;
        remove(event:any):boolean;
    }
    export class Scheduler<T>{
        getTime():number;
        //add(item:T,repeat:boolean):Scheduler<T>;
        clear():Scheduler<T>;
        remove(item:T):boolean;
        next():T;
    }
    export class Engine{
        constructor(scheduler:Scheduler<any>);
        start():Engine;
        lock():Engine;
        unlock():Engine;
    }
    export class Map{
        constructor(width?: number, height?: number);
        create(callback?: DigCallback ): void;
    }
    export class Noise{
        get(x:number,y:number):number;
    }
    enum Topology {
        four=4,
        six=6,
        eight=8
    }
    interface IFovOptions{
        topology?:Topology
    }
    export class FOV{
        constructor(lightPassesCallback:LightPassesCallback,options?:IFovOptions);
        compute(x:number,y:number,R:number, callback:ComputeLightCallback);
    }
    interface IPathOptions{
        topology?:Topology
    }
    export class Path{
        constructor(toX:number, toY:number, passableCallback:PassableCallback,options?:IPathOptions);
        compute(fromX:number, fromY:number, calbback:PathCallback);
    }
    export class Color{
        static fromString(str:string):number[];
        static add(color1:number[],color2:number[]):number[];
        static add_(color1:number[],color2:number[]):number[];
        static multiply(color1:number[],color2:number[]):number[];
        static multiply_(color1:number[],color2:number[]):number[];
        static interpolate(color1:number[],color2:number[],factor:number):number[];
        static interpolateHSL(color1:number[],color2:number[],factor:number):number[];
        static randomize(color1:number[],color2:number[]):number[];
        static rgb2hsl(color:number[]):number[];
        static hsl2rgb(color:number[]):number[];
        static toRGB(color:number[]):string;
        static toHex(color:number[]):string;
    }
    interface ILightingOptions{
        passes?:number;
        emissionThreshold?:number;
        range?:number;
    }
    export class Lighting{
        constructor(reflectivityCallback:ReflectivityCallback, options?:ILightingOptions);
        setOptions(options:ILightingOptions):Lighting;
        setFOV(fov:FOV):Lighting;
        setLight(x:number,y:number,color?:string|number[]):Lighting;
        clearLights();
        reset():Lighting;
        compute(lightingCallback:LightingCallback):Lighting
    }
}
declare module ROT.Scheduler{
    
    export class Simple extends Scheduler<any>{
        add(item:any, repeat:boolean):Simple
    }
    interface ISpeedItem{
        getSpeed():number;
    }
    export class Speed extends Scheduler<ISpeedItem>{
        add(item:any, repeat:boolean):Speed
    }
    export class Action extends Scheduler<any>{
        add(item:any, repeat:boolean, time:number):Action
        setDuration(time:number):Action;
    }
}
declare module ROT.Map{
    export class Arena extends Map{}
    export class DividedMaze extends Map{}
    export class IceyMaze extends Map{}
    export class EllerMaze extends Map{}
    interface ICellularOptions{
        born?: number[];
        survive?: number[];
        topology?: number;
    }
    export class Cellular extends Map{
        constructor(width: number, height: number, options?: ICellularOptions)
        randomize(probability:number):Cellular
        setOptions(options: ICellularOptions);
        set(x:number, y:number, value:number);
        serviceCallback(callback?: DigCallback );
        connect(callback:Function, value:number, connectionCallback: Function)
    }
    export class Dungeon extends Map{
        getRooms(): ROT.Map.Feature.Room[];
        getCorridors(): ROT.Map.Feature.Corridor[];
    }
    export class Digger extends Dungeon{}
    interface IUniformOptions{
        roomWidth?:number[];
        roomHeight?:number[];
        roomDugPercentage?:number;
        timeLimt?:number;
    }
    export class Uniform extends Dungeon{
        constructor(width: number, height: number, options?: IUniformOptions)
    }
    export class Rogue extends Map{}
    interface IFeatureOptions{
        roomWidth?:number[];
        roomHeight?:number[];
    }
    export class Feature{
        //isValid(canBeDugCallback:CanBeDugCallback):boolean;
        create(digCallback:DigCallback);
        debug();
        static createRandomAt(x:number, y:number, dx:number, dy:number, options?:IFeatureOptions):Feature
    }
}
interface DigCallback { (x: number, y: number, cellValue: number): void; }
interface DoorCallback { (x: number, y: number): void; }
interface PriorityWallCallback { (x: number, y: number): void; }
interface IsWallCallback {(x:number, y:number):boolean}
interface CanBeDugCallback { (x: number, y: number): boolean; }
interface LightPassesCallback { (x: number, y: number): boolean; }
interface ComputeLightCallback { (x:number, y:number, r:number, visibility:number):void; }
interface LightingCallback { (x:number, y:number, color:number[]):void; }
interface ReflectivityCallback { (x:number, y:number):boolean; }
interface PassableCallback { (x:number, y:number):boolean;}
interface PathCallback{ (x:number, y:number):void}

declare module ROT.Map.Feature{
    export class Room extends Feature{
        constructor(x1:number, y1:number, x2:number, y2:number, doorX:number, doorY:number);
        static createRandomCenter(cx:number, cy:number, options?:IFeatureOptions) : Room;
        static createRandom(availWidth:number, availHeight:number, options?:IFeatureOptions) : Room;
        addDoor(x:number, y:number):Room;
        getDoors(callback:DoorCallback):Room;
        clearDoors():Room;
        addDoors(isWallCallback:IsWallCallback):Room;
        isValid(isWallCallback:IsWallCallback,canBeDugCallback:CanBeDugCallback):boolean;
        getCenter():[number,number]//number[]?
        getLeft():number;
        getRight():number;
        getTop():number;
        getBottom():number;
    }
    interface ICorridorOptions{
        corridorLength?:[number,number];
    }
    export class Corridor extends Feature{
        constructor(startX:number,startY:number, endX:number, endY:number);
        static createReadomAt(x:number, y:number, dx:number, dy:number, options?:ICorridorOptions):Corridor
        debug();
        isValid(isWallCallback:IsWallCallback,canBeDugCallback:CanBeDugCallback):boolean;
        createPriorityWalls(priorityWallCallback:PriorityWallCallback);
    }
}
declare module ROT.FOV{
    export class DiscreteShadowcasting extends FOV{}
    export class PreciseShadowcasting extends FOV{}
    export class RecursiveShadowcasting extends FOV{
        compute180(x:number, y:number, R:number, dir:number,callback:ComputeLightCallback);
        compute90S(x:number, y:number, R:number, dir:number,callback:ComputeLightCallback);

    }
}
declare module ROT.Noise{
    export class Simplex extends Noise{
        constructor(gradients:number);
    }
}
declare module ROT.Path{
    export class Dijkstra extends Path{}
    export class AStar extends Path{}
}