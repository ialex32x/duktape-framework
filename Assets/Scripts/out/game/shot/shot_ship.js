"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vec2_1 = require("../../base/vec2");
var GameObject = UnityEngine.GameObject;
var UObject = UnityEngine.Object;
var Input = UnityEngine.Input;
var KeyCode = UnityEngine.KeyCode;
var ShotShip = /** @class */ (function () {
    function ShotShip() {
        this._position = vec2_1.Vec2.zero;
        this._speed = vec2_1.Vec2.zero;
        this._scalarSpeed = 10;
        this._halfExt = new UnityEngine.Vector3(0.5, 0.5, 0.5);
        this._lifetime = 0;
    }
    Object.defineProperty(ShotShip.prototype, "poistion", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShotShip.prototype, "alive", {
        get: function () {
            return this._alive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShotShip.prototype, "lifetime", {
        get: function () {
            return this._lifetime;
        },
        enumerable: true,
        configurable: true
    });
    ShotShip.prototype.init = function (game) {
        this._game = game;
        this._gameObject = GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
        var co = this._gameObject.GetComponent(UnityEngine.BoxCollider);
        UnityEngine.Object.DestroyImmediate(co);
        co = null;
        this._transform = this._gameObject.transform;
        this._transform.localScale = new UnityEngine.Vector3(2, 2, 2);
    };
    ShotShip.prototype.restart = function () {
        this._position.zero();
        this._lifetime = 0;
        this._alive = true;
    };
    ShotShip.prototype.update = function (dt) {
        if (this._alive) {
            this._lifetime += dt;
            var dx = 0;
            var dy = 0;
            if (Input.GetKey(KeyCode.A)) {
                dx -= 1;
            }
            if (Input.GetKey(KeyCode.D)) {
                dx += 1;
            }
            if (Input.GetKey(KeyCode.W)) {
                dy += 1;
            }
            if (Input.GetKey(KeyCode.S)) {
                dy -= 1;
            }
            var a = dt * this._scalarSpeed;
            this._speed.set(dx * a, dy * a);
            var nx = this._position.x + this._speed.x;
            var ny = this._position.y + this._speed.y;
            if (this._game.movable(nx, ny)) {
                this._position.set(nx, ny);
                this._transform.SetLocalPosition(this._position.x, this._position.y, 0);
            }
            if (UnityEngine.Physics.BoxCast(this._transform.localPosition, this._halfExt, UnityEngine.Vector3.forward)) {
                this._alive = false;
            }
        }
    };
    ShotShip.prototype.destroy = function () {
        this._game = null;
        UObject.Destroy(this._gameObject);
        this._gameObject = null;
        this._transform = null;
    };
    return ShotShip;
}());
exports.ShotShip = ShotShip;
//# sourceMappingURL=shot_ship.js.map