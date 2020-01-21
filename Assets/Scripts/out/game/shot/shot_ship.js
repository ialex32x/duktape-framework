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
    }
    Object.defineProperty(ShotShip.prototype, "poistion", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    ShotShip.prototype.init = function () {
        this._gameObject = GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
        this._transform = this._gameObject.transform;
    };
    ShotShip.prototype.restart = function () {
        this._position.zero();
    };
    ShotShip.prototype.update = function (dt) {
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
        var a = dt * 2;
        this._speed.set(dx * a, dy * a);
        this._position.add(this._speed);
        this._transform.SetLocalPosition(this._position.x, this._position.y, 0);
    };
    ShotShip.prototype.destroy = function () {
        UObject.Destroy(this._gameObject);
        this._gameObject = null;
        this._transform = null;
    };
    return ShotShip;
}());
exports.ShotShip = ShotShip;
//# sourceMappingURL=shot_ship.js.map