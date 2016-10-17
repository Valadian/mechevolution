var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Entity = (function () {
            function Entity(visual) {
            }
            return Entity;
        }());
        rogue.Entity = Entity;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
/// <reference path="entity.ts" />
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Cell = (function (_super) {
            __extends(Cell, _super);
            function Cell(visual, solid) {
                _super.call(this, visual);
                this._solid = solid;
            }
            Cell.prototype.solid = function () {
                return this._solid;
            };
            Cell.wall = new Cell({
                ch: "#",
                fg: [150, 150, 150],
                description: "rock"
            }, true);
            Cell.diamond = new Cell({
                ch: "▼",
                fg: [185, 242, 355],
                description: "diamond"
            }, true);
            Cell.iron = new Cell({
                ch: "■",
                fg: [230, 231, 232],
                description: "iron"
            }, true);
            Cell.copper = new Cell({
                ch: "▬",
                fg: [184, 115, 51],
                description: "copper"
            }, true);
            Cell.tin = new Cell({
                ch: "▬",
                fg: [211, 212, 213],
                description: "tin"
            }, true);
            Cell.quartz = new Cell({
                ch: "♦",
                fg: [255, 255, 255],
                description: "quartz"
            }, true);
            Cell.empty = new Cell({
                ch: ".",
                fg: [51, 51, 51]
            }, false);
            return Cell;
        }(rogue.Entity));
        rogue.Cell = Cell;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
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
        rogue.Vector2 = Vector2;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
/// <reference path="vector2.ts" />
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Game = (function () {
            function Game() {
            }
            Game.prototype.init = function () {
                var _this = this;
                //ROT.RNG.setSeed(12345);
                Game.display = new ROT.Display({ width: Game.MAP_SIZE.x, height: Game.MAP_SIZE.y, fontSize: 8 });
                document.body.appendChild(Game.display.getContainer());
                Game.data = {};
                Game.map = new ROT.Map.Cellular(Game.MAP_SIZE.x, Game.MAP_SIZE.y);
                Game.map.randomize(0.42);
                Game.map.create(function (x, y, value) {
                    Game.data[x + "," + y] = value;
                    Game.display.DEBUG(x, y, value);
                });
                new Promise(function (resolve, reject) {
                    resolve(_this.findClearSpot());
                }).then(function (pos) {
                    Game.player = new rogue.Player(pos);
                    Game.display.draw(Game.player.pos.x, Game.player.pos.y, "", "", "#3f3");
                });
            };
            Game.prototype.findClearSpot = function () {
                var pos = new rogue.Vector2(0, 0);
                do {
                    pos.x = ROT.RNG.getUniformInt(0, Game.MAP_SIZE.x - 1);
                    pos.y = ROT.RNG.getUniformInt(0, Game.MAP_SIZE.y - 1);
                } while (Game.data[pos.toString()] != 1);
                return pos;
            };
            Game.prototype.handleEvent = function (e) {
                switch (e.type) {
                    case "keypress":
                        break;
                }
            };
            Game.TEXT_HEIGHT = 3;
            Game.STATUS_HEIGHT = 3;
            Game.MAP_SIZE = new rogue.Vector2(100, 30);
            return Game;
        }());
        rogue.Game = Game;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
var game = new bergecraft.rogue.Game();
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Level = (function () {
            function Level() {
                this._size = rogue.Game.MAP_SIZE;
                this._beings = {};
                this._items = {};
                this._cells = {};
                this._free = {};
                this._empty = rogue.Cell.empty;
                this._create();
            }
            Level.prototype.activate = function () {
                for (var p in this._beings) {
                    rogue.Game.scheduler.add(this._beings[p], true);
                }
            };
            Level.prototype._create = function () {
            };
            return Level;
        }());
        rogue.Level = Level;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Being = (function () {
            function Being(pos) {
                this._pos = pos;
            }
            Being.prototype.draw = function () {
            };
            return Being;
        }());
        rogue.Being = Being;
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(pos) {
                _super.call(this, pos);
                this._char = "J";
                this._color = ROT.Color.fromString("green");
                this._keys = {};
                this._keys[ROT.VK_K] = 0;
                this._keys[ROT.VK_UP] = 0;
                this._keys[ROT.VK_NUMPAD8] = 0;
                this._keys[ROT.VK_U] = 1;
                this._keys[ROT.VK_PAGE_UP] = 1;
                this._keys[ROT.VK_NUMPAD9] = 1;
                this._keys[ROT.VK_L] = 2;
                this._keys[ROT.VK_RIGHT] = 2;
                this._keys[ROT.VK_NUMPAD6] = 2;
                this._keys[ROT.VK_N] = 3;
                this._keys[ROT.VK_PAGE_DOWN] = 3;
                this._keys[ROT.VK_NUMPAD3] = 3;
                this._keys[ROT.VK_J] = 4;
                this._keys[ROT.VK_DOWN] = 4;
                this._keys[ROT.VK_NUMPAD2] = 4;
                this._keys[ROT.VK_B] = 5;
                this._keys[ROT.VK_END] = 5;
                this._keys[ROT.VK_NUMPAD1] = 5;
                this._keys[ROT.VK_H] = 6;
                this._keys[ROT.VK_LEFT] = 6;
                this._keys[ROT.VK_NUMPAD4] = 6;
                this._keys[ROT.VK_Y] = 7;
                this._keys[ROT.VK_HOME] = 7;
                this._keys[ROT.VK_NUMPAD7] = 7;
            }
            Player.prototype.handleEvent = function (e) {
                if (e.ctrlKey || e.altKey) {
                    return;
                }
                if (e.keyCode == ROT.VK_SHIFT) {
                    return;
                }
                window.removeEventListener("keydown", this);
                var code = e.keyCode;
                if (code in this._keys) {
                    var direction = this._keys[code];
                    var dir = ROT.DIRS[8][direction];
                    var xy = this._pos.plus(new rogue.Vector2(dir[0], dir[1]));
                }
            };
            return Player;
        }(Being));
        rogue.Player = Player;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
//# sourceMappingURL=site.js.map