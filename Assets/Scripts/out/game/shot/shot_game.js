"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input = UnityEngine.Input;
var KeyCode = UnityEngine.KeyCode;
var shot_ship_1 = require("./shot_ship");
var shot_bullet_1 = require("./shot_bullet");
var vec2_1 = require("../../base/vec2");
var random_1 = require("../../base/random");
var ShotGame = /** @class */ (function () {
    function ShotGame() {
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
    ShotGame.prototype.init = function (onfinish) {
        var _this = this;
        this._hint = UnityEngine.GameObject.Find("/hint");
        this._hint.SetActive(false);
        this._xMin = -50;
        this._yMin = -50;
        this._xMax = 50;
        this._yMax = 50;
        this._bulletInterval = 0.25;
        this._posEmitter[0] = function () { return new vec2_1.Vec2(_this._rng.rangeDouble(_this._xMin, _this._xMax), _this._yMin); };
        this._posEmitter[2] = function () { return new vec2_1.Vec2(_this._rng.rangeDouble(_this._xMin, _this._xMax), _this._yMax); };
        this._posEmitter[1] = function () { return new vec2_1.Vec2(_this._xMin, _this._rng.rangeDouble(_this._yMin, _this._yMax)); };
        this._posEmitter[3] = function () { return new vec2_1.Vec2(_this._xMax, _this._rng.rangeDouble(_this._yMin, _this._yMax)); };
        this._ship = new shot_ship_1.ShotShip();
        this._ship.init(this);
        this._solidMatAsset = UnityFS.ResourceManager.LoadAsset("Assets/Data/Materials/solid.mat", UnityEngine.Material);
        this._solidMatAsset.completed.on(function (self) {
            // console.log("solid mat loaded", self.GetObject());
            onfinish();
        });
    };
    ShotGame.prototype.contains = function (pos) {
        return pos.x >= this._xMin && pos.x <= this._xMax && pos.y >= this._yMin && pos.y <= this._yMax;
    };
    ShotGame.prototype.movable = function (x, y) {
        return x >= (this._xMin + 5) && x <= (this._xMax - 5) && y >= (this._yMin + 5) && y <= (this._yMax - 5);
    };
    ShotGame.prototype.shot = function (n) {
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
                sv *= 1.85;
                this._nextMegaBullet += 12;
            }
            var s = vec2_1.Vec2.sub(p2, p1).normalize().mul(sv);
            b.restart(p1, s);
        }
    };
    ShotGame.prototype.createBullet = function () {
        var n = this._inactive.length;
        if (this._bullets.length - n > this._bulletCountMax) {
            return null;
        }
        var b;
        if (n == 0) {
            b = new shot_bullet_1.ShotBullet();
            this._bullets.push(b);
            b.init(this._solidMatAsset.GetObject());
        }
        else {
            var f = this._inactive.splice(n - 1)[0];
            b = this._bullets[f];
        }
        return b;
    };
    ShotGame.prototype.update = function (dt) {
        if (this._ship.alive) {
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
            if (!this._ship.alive) {
                this._hint.SetActive(true);
                var text = this._hint.GetComponent(UnityEngine.TextMesh);
                text.text = "<b><color=red>Time: " + this._ship.lifetime.toFixed(2) + "</color></b>\n[Space] to restart.";
            }
        }
        else {
            if (Input.GetKey(KeyCode.Space)) {
                this.restart();
            }
        }
    };
    ShotGame.prototype.restart = function () {
        this._hint.SetActive(false);
        var bulletCount = this._bullets.length;
        for (var i = 0; i < bulletCount; i++) {
            var bullet = this._bullets[i];
            if (bullet.actived) {
                bullet.deactivate();
                this._inactive.push(i);
            }
        }
        this.shot(20);
        this._ship.restart();
    };
    ShotGame.prototype.destroy = function () {
        var bulletCount = this._bullets.length;
        for (var i = 0; i < bulletCount; i++) {
            var bullet = this._bullets[i];
            bullet.destroy();
        }
        this._bullets.splice(0);
        this._inactive.splice(0);
        this._ship.destroy();
        this._solidMatAsset = null;
    };
    return ShotGame;
}());
exports.ShotGame = ShotGame;
exports.default = ShotGame;
//# sourceMappingURL=shot_game.js.map