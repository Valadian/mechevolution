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
                this._visual = visual;
            }
            Entity.prototype.getVisual = function () {
                return this._visual;
            };
            Entity.prototype.getPosition = function () {
                return this._pos;
            };
            Entity.prototype.getLevel = function () {
                return this._level;
            };
            Entity.prototype.setPosition = function (xy, level) {
                this._pos = xy;
                this._level = level;
                return this;
            };
            Entity.prototype.a = function () {
                var first = this._visual.description.charAt(0);
                return (first.match(/[aeiouy]/i) ? "an" : "a") + " " + this._visual.description;
            };
            Entity.prototype.the = function () {
                return "the " + this._visual.description;
            };
            Entity.prototype.it = function () {
                return "it";
            };
            Entity.prototype.verb = function (verb) {
                return verb + (verb.charAt(verb.length - 1) == "s" ? "es" : "s");
            };
            Entity.prototype.toString = function () {
                return this._visual.description;
            };
            return Entity;
        }());
        rogue.Entity = Entity;
        String.format.map.a = "a";
        String.format.map.the = "the";
        String.format.map.verb = "verb";
        String.format.map.it = "it";
        String.format.map.h = "formatHelp";
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
/// <reference path="entity.ts" />
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Being = (function (_super) {
            __extends(Being, _super);
            function Being(visual) {
                _super.call(this, visual);
                this._stats = {};
                //this._pos = pos;
                rogue.Stats.all.forEach(function (name) {
                    this._stats[name] = rogue.Stats[name].def;
                }, this);
            }
            Being.prototype.getStat = function (name) {
                return this._stats[name];
            };
            Being.prototype.setStat = function (name, value) {
                this._stats[name] = value;
                return this;
            };
            Being.prototype.adjustStat = function (name, diff) {
                /* cannot use this.getStat(), might be modified by items */
                this.setStat(name, this._stats[name] + diff);
                return this;
            };
            /**
             * Called by the Scheduler
             */
            Being.prototype.getSpeed = function () {
                return this.getStat("speed");
            };
            Being.prototype.damage = function (damage) {
                this.adjustStat("hp", -damage);
                if (this.getStat("hp") <= 0) {
                    this.die();
                }
            };
            Being.prototype.act = function () { };
            Being.prototype.die = function () {
                this._level.setBeing(null, this._pos);
                rogue.Game.scheduler.remove(this);
            };
            Being.prototype.setPosition = function (xy, level) {
                /* came to a currently active level; add self to the scheduler */
                if (level != this._level && level == rogue.Game.level) {
                    rogue.Game.scheduler.add(this, true);
                }
                return _super.prototype.setPosition.call(this, xy, level);
            };
            Being.prototype._attack = function (defender) {
                var attack = this.getStat("attack");
                var defense = defender.getStat("defense");
                var abonus = ROT.RNG.getNormal(0, 3);
                var dbonus = ROT.RNG.getNormal(0, 3);
                console.log("Attack:", attack, "+", abonus, "vs.", defense, "+", dbonus);
                attack += abonus;
                defense += dbonus;
                attack = Math.max(1, attack);
                defense = Math.max(1, defense);
                var damage = Math.ceil(attack / defense) - 1;
                this._describeAttack(defender, damage);
                if (damage) {
                    defender.damage(damage);
                }
            };
            Being.prototype._describeAttack = function (defender, damage) {
                if (!this._level.isVisible(this._pos) || !this._level.isVisible(defender.getPosition())) {
                    return;
                }
                if (damage) {
                    var amount = Math.max(defender.getStat("hp") - damage, 0) / defender.getStat("maxhp");
                    if (!amount) {
                        var verb = ["kill", "destroy", "slaughter"].random();
                        rogue.Game.text.write(("%The %{verb,kill} %the.").format(this, this, defender));
                    }
                    else {
                        var types = ["slightly", "moderately", "severly", "critically"].reverse();
                        amount = Math.ceil(amount * types.length) - 1;
                        rogue.Game.text.write(("%The %{verb,hit} %the and " + types[amount] + " %{verb,damage} %it.").format(this, this, defender, this, defender));
                    }
                }
                else {
                    rogue.Game.text.write(("%The %{verb,miss} %the.").format(this, this, defender));
                }
            };
            Being.prototype._idle = function () {
                var xy = this._getAvailableNeighbors().random();
                if (xy) {
                    this._level.setBeing(this, xy);
                }
            };
            Being.prototype._getAvailableNeighbors = function () {
                var result = [];
                ROT.DIRS[8].forEach(function (dir) {
                    var xy = new rogue.Vector2(this._xy.x + dir[0], this._xy.y + dir[1]);
                    if (this._level.blocks(xy) || this._level.getBeingAt(xy)) {
                        return;
                    }
                    result.push(xy);
                }, this);
                return result;
            };
            Being.prototype.draw = function () {
            };
            return Being;
        }(rogue.Entity));
        rogue.Being = Being;
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
                ch: "",
                fg: [50, 50, 50],
                bg: [50, 50, 50],
                description: "stone wall"
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
                fg: [151, 151, 151]
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
            Vector2.fromString = function (str) {
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
            Game.init = function () {
                //ROT.RNG.setSeed(12345);
                this.player = new rogue.Player();
                Game.display = new ROT.Display({ width: Game.MAP_SIZE.x, height: Game.MAP_SIZE.y + Game.TEXT_HEIGHT, fontSize: Game.FONT_SIZE });
                document.body.appendChild(Game.display.getContainer());
                Game.data = {};
                Game.map = new ROT.Map.Cellular(Game.MAP_SIZE.x, Game.MAP_SIZE.y);
                Game.map.randomize(0.42);
                Game.map.create(function (x, y, value) {
                    Game.data[x + "," + y] = value;
                    //Game.display.DEBUG(x,y,value);
                });
                Game.text = new rogue.TextBuffer();
                Game.text.configure({
                    display: Game.display,
                    position: new rogue.Vector2(0, 0),
                    size: new rogue.Vector2(Game.MAP_SIZE.x, Game.TEXT_HEIGHT)
                });
                Game.text.clear();
                // new Promise((resolve, reject)=>{
                //     resolve(this.findClearSpot());
                // }).then((pos:Vector2) => {
                //     Game.player = new Player(pos);
                //     Game.display.draw(Game.player.pos.x,Game.player.pos.y,"","","#3f3");
                // });
                Game._start();
            };
            // static findClearSpot() {
            //     var pos = new Vector2(0,0);
            //     do{
            //         pos.x = ROT.RNG.getUniformInt(0,Game.MAP_SIZE.x-1);
            //         pos.y = ROT.RNG.getUniformInt(0,Game.MAP_SIZE.y-1);
            //     } while (Game.data[pos.toString()]!=1)
            //     return pos;
            // }
            Game.handleEvent = function (e) {
                switch (e.type) {
                    case "keypress":
                        break;
                }
            };
            Game.over = function () {
            };
            Game._start = function () {
                Game.scheduler = new ROT.Scheduler.Action();
                Game.engine = new ROT.Engine(this.scheduler);
                /* build a level and position a player */
                var underground = new rogue.Level.Underground(1);
                this.switchLevel(underground, underground.getSpawn());
                Game.engine.start();
            };
            Game.switchLevel = function (level, xy) {
                if (this.level) {
                    this.level.deactivate();
                }
                this.level = level;
                this.level.activate();
                this.level.setBeing(this.player, xy);
            };
            Game.TEXT_HEIGHT = 3;
            Game.FONT_SIZE = 20;
            Game.STATUS_HEIGHT = 3;
            Game.MAP_SIZE = new rogue.Vector2(150, 45);
            return Game;
        }());
        rogue.Game = Game;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
var Game = bergecraft.rogue.Game.prototype;
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
            Level.prototype._create = function () {
            };
            Level.prototype.drawMemory = function () { };
            Level.prototype.isVisible = function (xy) { return false; };
            Level.prototype.setCell = function (cell, xy) {
                if (cell) {
                    this._cells[xy.toString()] = cell;
                }
                else {
                    delete this._cells[xy.toString()];
                }
                this.draw(xy);
            };
            Level.prototype.activate = function () {
                for (var p in this._beings) {
                    rogue.Game.scheduler.add(this._beings[p], true);
                }
                rogue.Game.display.clear();
                this.drawMemory();
                //Game.status.update();
            };
            Level.prototype.deactivate = function () {
                rogue.Game.scheduler.clear();
            };
            Level.prototype.solid = function (xy) {
                return (this._cells[xy.toString()] || this._empty).solid();
            };
            Level.prototype.draw = function (xy) {
                var visual = this._visualAt(xy);
                var bg = visual.bg || this._getBackgroundColor(xy);
                rogue.Game.display.draw(xy.x, xy.y + rogue.Game.TEXT_HEIGHT, visual.ch, ROT.Color.toRGB(visual.fg), ROT.Color.toRGB(bg));
            };
            Level.prototype._getBackgroundColor = function (xy) {
                return [255, 255, 255];
            };
            Level.prototype.getSize = function () {
                return this._size;
            };
            Level.prototype._visualAt = function (xy, excludeBeings) {
                var xys = xy.toString(); /* cache to optimize for speed */
                return ((!excludeBeings && this._beings[xys]) || this._items[xys] || this._cells[xys] || this._empty).getVisual();
            };
            Level.prototype.getBeingAt = function (xy) {
                return this._beings[xy.toString()] || null;
            };
            Level.prototype.getItemAt = function (xy) {
                return this._items[xy.toString()] || null;
            };
            Level.prototype.getCellAt = function (xy) {
                return this._cells[xy.toString()] || this._empty;
            };
            Level.prototype.setBeing = function (being, xy) {
                if (!being) {
                    delete this._beings[xy.toString()];
                    if (rogue.Game.level == this) {
                        this.draw(xy);
                    }
                    return;
                }
                /* remove from old position, draw */
                if (being.getLevel() == this) {
                    var oldXY = being.getPosition();
                    delete this._beings[oldXY.toString()];
                    if (rogue.Game.level == this) {
                        this.draw(oldXY);
                    }
                }
                var cell = this._cells[xy.toString()];
                if (cell && cell.enter) {
                    cell.enter(being);
                }
                being.setPosition(xy, this); /* propagate position data to the entity itself */
                /* set new position, draw */
                this._beings[xy.toString()] = being;
                if (rogue.Game.level == this) {
                    this.draw(xy);
                }
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
        var Level;
        (function (Level) {
            var Underground = (function (_super) {
                __extends(Underground, _super);
                function Underground(depth) {
                    _super.call(this);
                    this._colors = [];
                    this._noise = new ROT.Noise.Simplex();
                    this._memory = {};
                    this._depth = 1;
                    this._fov = {};
                    this._depth = depth;
                    this._colors.push([100, 100, 100]);
                    this._colors.push([200, 200, 200]);
                }
                Underground.prototype._create = function () {
                    this._createWalls();
                    this._createMinerals();
                };
                Underground.prototype._createWalls = function () {
                    for (var val in rogue.Game.data) {
                        switch (rogue.Game.data[val]) {
                            case 0:
                                this._cells[val] = rogue.Cell.wall;
                                break;
                            case 1:
                                this._cells[val] = rogue.Cell.empty;
                                break;
                        }
                    }
                };
                Underground.prototype._createMinerals = function () {
                };
                Underground.prototype.drawMemory = function () {
                    this._fov = {};
                    for (var xy in this._memory) {
                        this._drawWeak(rogue.Vector2.fromString(xy), this._memory[xy]);
                    }
                };
                Underground.prototype.isVisible = function (xy) {
                    return (xy.toString() in this._fov);
                };
                Underground.prototype.draw = function (xy) {
                    /* draw only when in player's FOV */
                    if (xy.toString() in this._fov) {
                        return _super.prototype.draw.call(this, xy);
                    }
                };
                Underground.prototype.setBeing = function (being, xy) {
                    if (!being) {
                        delete this._beings[xy.toString()];
                        if (rogue.Game.level == this) {
                            this.draw(xy);
                        }
                        return;
                    }
                    /* remove from old position, draw */
                    if (being.getLevel() == this) {
                        var oldXY = being.getPosition();
                        delete this._beings[oldXY.toString()];
                        if (rogue.Game.level == this) {
                            this.draw(oldXY);
                        }
                    }
                    var cell = this._cells[xy.toString()];
                    if (cell && cell.enter) {
                        cell.enter(being);
                    }
                    being.setPosition(xy, this); /* propagate position data to the entity itself */
                    if (being == rogue.Game.player) {
                        this._updateFOV(being);
                    }
                    /* set new position, draw */
                    this._beings[xy.toString()] = being;
                    if (rogue.Game.level == this) {
                        this.draw(xy);
                    }
                };
                Underground.prototype._drawWeak = function (xy, visual) {
                    var fg = ROT.Color.interpolate([0, 0, 0], visual.fg, 0.5);
                    var bg = visual.bg || this._getBackgroundColor(xy);
                    rogue.Game.display.draw(xy.x, xy.y + rogue.Game.TEXT_HEIGHT, visual.ch, ROT.Color.toRGB(fg), ROT.Color.toRGB(bg));
                };
                Underground.prototype._updateFOV = function (being) {
                    var oldFOV = this._fov;
                    this._fov = being.computeFOV();
                    for (var id in this._fov) {
                        var xy = this._fov[id];
                        this._memory[xy.toString()] = this._visualAt(xy, true);
                        if (id in oldFOV) {
                            delete oldFOV[id];
                        }
                        else {
                            this.draw(xy);
                        }
                    }
                    for (var id in oldFOV) {
                        var xy = oldFOV[id];
                        var visual = this._visualAt(xy, true);
                        this._drawWeak(xy, visual);
                    }
                };
                Underground.prototype._getBackgroundColor = function (xy) {
                    var val = this._noise.get(xy.x / 20, xy.y / 20) / 2 + 0.5;
                    return ROT.Color.interpolate(this._colors[0], this._colors[1], val);
                };
                Underground.prototype.getSpawn = function () {
                    var pos = new rogue.Vector2(0, 0);
                    do {
                        pos.x = ROT.RNG.getUniformInt(0, rogue.Game.MAP_SIZE.x - 1);
                        pos.y = ROT.RNG.getUniformInt(0, rogue.Game.MAP_SIZE.y - 1);
                    } while (rogue.Game.data[pos.toString()] != 1);
                    return pos;
                };
                return Underground;
            }(Level));
            Level.Underground = Underground;
        })(Level = rogue.Level || (rogue.Level = {}));
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
/// <reference path="being.ts" />
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(pos) {
                _super.call(this, { ch: "B", fg: [0, 255, 0], description: "self" });
                this._promise = null;
                this._char = "B";
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
            Player.prototype.act = function () {
                // Progress.turns++;
                //Game.status.updatePart("turns");
                this._promise = new rogue.Promise();
                this._listen();
                return this._promise;
            };
            Player.prototype.die = function () {
                _super.prototype.die.call(this);
                rogue.Game.over();
            };
            Player.prototype.handleEvent = function (e) {
                if (e.ctrlKey || e.altKey) {
                    return;
                }
                if (e.keyCode == ROT.VK_SHIFT) {
                    return;
                }
                window.removeEventListener("keydown", this);
                rogue.Game.text.clear();
                var code = e.keyCode;
                if (code in this._keys) {
                    var direction = this._keys[code];
                    var dir = ROT.DIRS[8][direction];
                    var xy = this._pos.plus(new rogue.Vector2(dir[0], dir[1]));
                    if (this._level.solid(xy)) {
                        var d = this._level.getCellAt(xy).getVisual().description;
                        if (d) {
                            rogue.Game.text.write("You bump into %a.".format(this._level.getCellAt(xy)));
                        }
                        return this._listen();
                    }
                    else {
                        this._level.setBeing(this, xy);
                    }
                    return this._promise.fulfill();
                }
            };
            Player.prototype.computeFOV = function () {
                var result = {};
                var level = this._level;
                var fov = new ROT.FOV.PreciseShadowcasting(function (x, y) {
                    return !level.solid(new rogue.Vector2(x, y));
                });
                fov.compute(this._pos.x, this._pos.y, this.getStat("sight"), function (x, y, r, amount) {
                    var xy = new rogue.Vector2(x, y);
                    result[xy.toString()] = xy;
                });
                return result;
            };
            Player.prototype._listen = function (e) {
                rogue.Game.text.flush();
                window.addEventListener("keydown", this);
            };
            return Player;
        }(rogue.Being));
        rogue.Player = Player;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Promise = (function () {
            function Promise() {
                this._thenPromises = [];
                this._state = 0; /* 0 = pending, 1 = fulfilled, 2 = rejected */
                this._value = null; /* fulfillment / rejection value */
                this._cb = {
                    fulfilled: [],
                    rejected: []
                };
                this._thenPromises = []; /* promises returned by then() */
            }
            /**
             * @param {function} onFulfilled To be called once this promise gets fulfilled
             * @param {function} onRejected To be called once this promise gets rejected
             * @returns {Promise}
             */
            Promise.prototype.then = function (onFulfilled, onRejected) {
                this._cb.fulfilled.push(onFulfilled);
                this._cb.rejected.push(onRejected);
                var thenPromise = new Promise();
                this._thenPromises.push(thenPromise);
                if (this._state > 0) {
                    setTimeout(this._processQueue.bind(this), 0);
                }
                /* 3.2.6. then must return a promise. */
                return thenPromise;
            };
            /**
             * Fulfill this promise with a given value
             * @param {any} value
             */
            Promise.prototype.fulfill = function (value) {
                if (this._state != 0) {
                    return this;
                }
                this._state = 1;
                this._value = value;
                this._processQueue();
                return this;
            };
            /**
             * Reject this promise with a given value
             * @param {any} value
             */
            Promise.prototype.reject = function (value) {
                if (this._state != 0) {
                    return this;
                }
                this._state = 2;
                this._value = value;
                this._processQueue();
                return this;
            };
            /**
             * Pass this promise's resolved value to another promise
             * @param {Promise} promise
             */
            Promise.prototype.chain = function (promise) {
                return this.then(promise.fulfill.bind(promise), promise.reject.bind(promise));
            };
            /**
             * @param {function} onRejected To be called once this promise gets rejected
             * @returns {Promise}
             */
            Promise.prototype.catch = function (onRejected) {
                return this.then(null, onRejected);
            };
            Promise.prototype._processQueue = function () {
                while (this._thenPromises.length) {
                    var onFulfilled = this._cb.fulfilled.shift();
                    var onRejected = this._cb.rejected.shift();
                    this._executeCallback(this._state == 1 ? onFulfilled : onRejected);
                }
            };
            Promise.prototype._executeCallback = function (cb) {
                var thenPromise = this._thenPromises.shift();
                if (typeof (cb) != "function") {
                    if (this._state == 1) {
                        /* 3.2.6.4. If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value. */
                        thenPromise.fulfill(this._value);
                    }
                    else {
                        /* 3.2.6.5. If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason. */
                        thenPromise.reject(this._value);
                    }
                    return;
                }
                try {
                    var returned = cb(this._value);
                    if (returned && typeof (returned.then) == "function") {
                        /* 3.2.6.3. If either onFulfilled or onRejected returns a promise (call it returnedPromise), promise2 must assume the state of returnedPromise */
                        var fulfillThenPromise = function (value) { thenPromise.fulfill(value); };
                        var rejectThenPromise = function (value) { thenPromise.reject(value); };
                        returned.then(fulfillThenPromise, rejectThenPromise);
                    }
                    else {
                        /* 3.2.6.1. If either onFulfilled or onRejected returns a value that is not a promise, promise2 must be fulfilled with that value. */
                        thenPromise.fulfill(returned);
                    }
                }
                catch (e) {
                    /* 3.2.6.2. If either onFulfilled or onRejected throws an exception, promise2 must be rejected with the thrown exception as the reason. */
                    thenPromise.reject(e);
                }
            };
            return Promise;
        }());
        rogue.Promise = Promise;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var Stats = (function () {
            function Stats() {
            }
            Stats.all = ["hp", "maxhp", "speed", "sight", "attack", "defense"];
            Stats.avail = ["maxhp", "speed", "sight", "attack", "defense"];
            Stats.maxhp = {
                def: 2,
                short: "HP",
                label: "Vitality",
                random: [1, [2, 3], [3, 4], [4, 5]]
            };
            Stats.hp = {
                def: Stats.maxhp.def,
                label: "HP"
            };
            Stats.speed = {
                def: 10,
                label: "Speed",
                short: "SPD",
                random: [1, [2, 3], [3, 4], [4, 5]]
            };
            Stats.sight = {
                def: 7,
                label: "Sight",
                short: "SEE",
                random: [1, 2, 3, 4]
            };
            Stats.attack = {
                def: 10,
                label: "Attack",
                short: "ATK",
                random: [1, [2, 3], [3, 4], [4, 5]]
            };
            Stats.defense = {
                def: 10,
                label: "Defense",
                short: "DEF",
                random: Stats.attack.random
            };
            return Stats;
        }());
        rogue.Stats = Stats;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
var bergecraft;
(function (bergecraft) {
    var rogue;
    (function (rogue) {
        var TextBuffer = (function () {
            function TextBuffer() {
                this._data = [];
                this._options = {
                    display: null,
                    position: new rogue.Vector2(),
                    size: new rogue.Vector2()
                };
            }
            // constructor(){
            // }
            TextBuffer.prototype.configure = function (options) {
                for (var p in options) {
                    this._options[p] = options[p];
                }
            };
            TextBuffer.prototype.clear = function () {
                this._data = [];
            };
            TextBuffer.prototype.write = function (text) {
                this._data.push("%c{}" + text);
            };
            TextBuffer.prototype.flush = function () {
                var o = this._options;
                var d = o.display;
                var pos = o.position;
                var size = o.size;
                /* clear */
                for (var i = 0; i < size.x; i++) {
                    for (var j = 0; j < size.y; j++) {
                        d.draw(pos.x + i, pos.y + j);
                    }
                }
                var text = this._data.join(" ");
                d.drawText(pos.x, pos.y, text, size.x);
            };
            return TextBuffer;
        }());
        rogue.TextBuffer = TextBuffer;
    })(rogue = bergecraft.rogue || (bergecraft.rogue = {}));
})(bergecraft || (bergecraft = {}));
//# sourceMappingURL=site.js.map