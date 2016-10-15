(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Vector2 = (function () {
        function Vector2(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        }
        Vector2.prototype.fromString = function (str) {
            var parts = str.split(",");
            return new Vector2(Number(parts[0]), Number(parts[1]));
        };
        Vector2.prototype.toString = function () {
            return this.x + "," + this.y;
        };
        Vector2.prototype.is = function (xy) {
            return this.x == xy.x && this.y == xy.y;
        };
        Vector2.prototype.dist8 = function (xy) {
            var dx = xy.x - this.x;
            var dy = xy.y - this.y;
            return Math.max(Math.abs(dx), Math.abs(dy));
        };
        Vector2.prototype.dist4 = function (xy) {
            var dx = xy.x - this.x;
            var dy = xy.y - this.y;
            return Math.abs(dx) + Math.abs(dy);
        };
        Vector2.prototype.dist = function (xy) {
            var dx = xy.x - this.x;
            var dy = xy.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        Vector2.prototype.plus = function (xy) {
            return new Vector2(this.x + xy.x, this.y + xy.y);
        };
        Vector2.prototype.minus = function (xy) {
            return new Vector2(this.x - xy.x, this.y - xy.y);
        };
        return Vector2;
    }());
    exports.Vector2 = Vector2;
});
//# sourceMappingURL=vector2.js.map