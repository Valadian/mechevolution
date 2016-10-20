module bergecraft.rogue{
    export interface ITextBufferOptions{
        display: ROT.Display,
        position: Vector2,
        size: Vector2
    }
    export class TextBuffer {
        _data = [];
        _options:ITextBufferOptions = {
            display: null,
            position: new Vector2(),
            size: new Vector2()
        }
        // constructor(){
        // }
        configure(options:ITextBufferOptions) {
            for (var p in options) { this._options[p] = options[p]; }
        }

        clear() {
            this._data = [];
        }

        write(text:string) {
            this._data.push("%c{}" + text);
        }

        flush() {
            var o = this._options;
            var d = o.display;
            var pos = o.position;
            var size = o.size;

            /* clear */
            for (var i=0;i<size.x;i++) {
                for (var j=0;j<size.y;j++) {
                    d.draw(pos.x+i, pos.y+j);
                }
            }

            var text = this._data.join(" ");
            d.drawText(pos.x, pos.y, text, size.x);
        }
    }

}