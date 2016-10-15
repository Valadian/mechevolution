(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "vector2"], factory);
    }
})(function (require, exports) {
    "use strict";
    var vector2_1 = require("vector2");
    var Game = (function () {
        function Game() {
        }
        Game.prototype.init = function () {
            var _this = this;
            var w = 150;
            var h = 80;
            //ROT.RNG.setSeed(12345);
            this.display = new ROT.Display({ width: w, height: h, fontSize: 8 });
            document.body.appendChild(this.display.getContainer());
            this.data = {};
            this.map = new ROT.Map.Cellular(w, h);
            this.map.randomize(0.5);
            this.map.create(function (x, y, value) {
                _this.data[x + "," + y] = value;
                _this.display.DEBUG(x, y, value);
            });
            var player = new Player(this.findClearSpot());
            this.display.draw(player.pos.x, player.pos.y, "", "", "#3f3");
        };
        Game.prototype.findClearSpot = function () {
            var start_x = ROT.RNG.getUniformInt(0, this.display.getOptions().width - 1);
            var start_y = ROT.RNG.getUniformInt(0, this.display.getOptions().height - 1);
            return new vector2_1.Vector2(start_x, start_y);
        };
        return Game;
    }());
    var Player = (function () {
        function Player(pos) {
            this.pos = pos;
        }
        return Player;
    }());
    var game = new Game();
});
//# sourceMappingURL=site.js.map