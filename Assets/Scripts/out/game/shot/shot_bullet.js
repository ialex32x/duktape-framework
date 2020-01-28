"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject = UnityEngine.GameObject;
var UObject = UnityEngine.Object;
var vec2_1 = require("../../base/vec2");
var ShotBullet = /** @class */ (function () {
    function ShotBullet() {
        this._active = false;
    }
    Object.defineProperty(ShotBullet.prototype, "x", {
        get: function () {
            return this._position.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShotBullet.prototype, "y", {
        get: function () {
            return this._position.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShotBullet.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShotBullet.prototype, "actived", {
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    ShotBullet.prototype.init = function (mat) {
        this._gameObject = GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Sphere);
        this._transform = this._gameObject.transform;
        var renderer = this._gameObject.GetComponent(UnityEngine.MeshRenderer);
        renderer.sharedMaterial = mat;
    };
    ShotBullet.prototype.restart = function (sourcePosition, speed) {
        this._position = sourcePosition;
        this._size = UnityEngine.Random.Range(0.65, 1.85);
        this._transform.localScale = new UnityEngine.Vector3(this._size, this._size, this._size);
        this._speed = speed.mul(this._size);
        this._active = true;
        this._transform.SetLocalPosition(this._position.x, this._position.y, 5);
        this._gameObject.SetActive(true);
    };
    ShotBullet.prototype.deactivate = function () {
        this._active = false;
        this._gameObject.SetActive(false);
    };
    ShotBullet.prototype.update = function (dt) {
        this._position.add(vec2_1.Vec2.mul(this._speed, dt));
        this._transform.SetLocalPosition(this._position.x, this._position.y, 5);
    };
    ShotBullet.prototype.destroy = function () {
        UObject.Destroy(this._gameObject);
        this._gameObject = null;
        this._transform = null;
    };
    return ShotBullet;
}());
exports.ShotBullet = ShotBullet;
//# sourceMappingURL=shot_bullet.js.map