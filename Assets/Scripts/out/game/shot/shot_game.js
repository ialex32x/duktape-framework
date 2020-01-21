"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shot_ship_1 = require("./shot_ship");
var shot_bullet_1 = require("./shot_bullet");
var vec2_1 = require("../../base/vec2");
var random_1 = require("../../base/random");
var default_1 = /** @class */ (function () {
    function default_1() {
        this._bullets = [];
        this._bulletCountMax = 100;
        this._inactive = [];
        this._nextMegaBullet = 10;
        this._bulletIndex = 0;
        this._rng = new random_1.Random();
        this._posEmitter = [];
        this._time = 0;
        this._bulletInterval = 0;
        this._bulletTime = 0;
        this._speed = 7;
        this._speedDiff = 1;
        this._xMin = 0;
        this._yMin = 0;
        this._xMax = 0;
        this._yMax = 0;
    }
    default_1.prototype.init = function () {
        var _this = this;
        this._xMin = -50;
        this._yMin = -50;
        this._xMax = 50;
        this._yMax = 50;
        this._bulletInterval = 2;
        this._posEmitter[0] = function () { return new vec2_1.Vec2(_this._rng.rangeDouble(_this._xMin, _this._xMax), _this._yMin); };
        this._posEmitter[2] = function () { return new vec2_1.Vec2(_this._rng.rangeDouble(_this._xMin, _this._xMax), _this._yMax); };
        this._posEmitter[1] = function () { return new vec2_1.Vec2(_this._xMin, _this._rng.rangeDouble(_this._yMin, _this._yMax)); };
        this._posEmitter[3] = function () { return new vec2_1.Vec2(_this._xMax, _this._rng.rangeDouble(_this._yMin, _this._yMax)); };
        this._ship = new shot_ship_1.ShotShip();
        this._ship.init();
    };
    default_1.prototype.contains = function (pos) {
        return pos.x >= this._xMin && pos.x <= this._xMax && pos.y >= this._yMin && pos.y <= this._yMax;
    };
    default_1.prototype.shot = function (n) {
        while (n-- > 0) {
            var b = this.createBullet();
            if (!b) {
                return;
            }
            this._bulletIndex++;
            var sv = this._rng.rangeDouble(this._speed - this._speedDiff, this._speed + this._speedDiff);
            var edge = this._rng.range32(0, this._posEmitter.length);
            var p1 = this._posEmitter[edge]();
            var p2 = this._ship.poistion;
            if (this._bulletIndex >= this._nextMegaBullet) {
                sv *= 1.25;
                this._nextMegaBullet += 20;
            }
            var s = vec2_1.Vec2.sub(p2, p1).normalize().mul(sv);
            b.restart(p1, s);
        }
    };
    default_1.prototype.createBullet = function () {
        var n = this._inactive.length;
        if (this._bullets.length - n > this._bulletCountMax) {
            return null;
        }
        var b;
        if (n == 0) {
            b = new shot_bullet_1.ShotBullet();
            this._bullets.push(b);
            b.init();
        }
        else {
            var f = this._inactive.splice(n - 1)[0];
            b = this._bullets[f];
        }
        return b;
    };
    default_1.prototype.update = function (dt) {
        this._time += dt;
        var bulletCount = this._bullets.length;
        for (var i = 0; i < bulletCount; i++) {
            var bullet = this._bullets[i];
            if (bullet.actived) {
                bullet.update(dt);
                if (!this.contains(bullet.position)) {
                    bullet.deactivate();
                    this._inactive.push(i);
                }
            }
        }
        this._ship.update(dt);
        this._bulletTime += dt;
        while (this._bulletTime >= this._bulletInterval) {
            this._bulletTime -= this._bulletInterval;
            this.shot(2);
        }
    };
    default_1.prototype.restart = function () {
        var bulletCount = this._bullets.length;
        for (var i = 0; i < bulletCount; i++) {
            var bullet = this._bullets[i];
            if (bullet.actived) {
                bullet.deactivate();
                this._inactive.push(i);
            }
        }
        this._ship.restart();
    };
    default_1.prototype.destroy = function () {
        var bulletCount = this._bullets.length;
        for (var i = 0; i < bulletCount; i++) {
            var bullet = this._bullets[i];
            bullet.destroy();
        }
        this._bullets.splice(0);
        this._inactive.splice(0);
        this._ship.destroy();
    };
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=shot_game.js.map