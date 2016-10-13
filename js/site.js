var Game = (function () {
    function Game() {
    }
    Game.prototype.init = function () {
        var _this = this;
        var w = 150;
        var h = 80;
        ROT.RNG.setSeed(12354);
        this.display = new ROT.Display({ width: w, height: h, fontSize: 6 });
        document.body.appendChild(this.display.getContainer());
        this.data = {};
        this.map = new ROT.Map.Uniform(w, h);
        this.map.create(function (x, y, value) {
            _this.data[x + "," + y] = value;
            _this.display.DEBUG(x, y, value);
        });
        var dijkstra = new ROT.Path.Dijkstra(93, 38, function (x, y) {
            return (_this.data[x + ",", y] == 0);
        });
        dijkstra.compute(8, 45, function (x, y) {
            _this.display.draw(x, y, "", "", "#800");
        });
        dijkstra.compute(130, 8, function (x, y) {
            _this.display.draw(x, y, "", "", "#800");
        });
        this.display.draw(8, 45, "", "", "#3f3");
        this.display.draw(130, 8, "", "", "#3f3");
        this.display.draw(98, 38, "", "", "#f33");
    };
    return Game;
}());
var game = new Game();
//# sourceMappingURL=site.js.map