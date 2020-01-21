"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec3 = /** @class */ (function () {
    function Vec3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Object.defineProperty(Vec3, "zero", {
        get: function () {
            return new Vec3(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3, "one", {
        get: function () {
            return new Vec3(1, 1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3, "left", {
        get: function () {
            return new Vec3(-1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3, "up", {
        get: function () {
            return new Vec3(0, -1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3, "right", {
        get: function () {
            return new Vec3(1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3, "down", {
        get: function () {
            return new Vec3(0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3, "forward", {
        get: function () {
            return new Vec3(0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3, "back", {
        get: function () {
            return new Vec3(0, 0, -1);
        },
        enumerable: true,
        configurable: true
    });
    Vec3.prototype.add = function (b) {
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
        return this;
    };
    Vec3.prototype.addXZ = function (b) {
        this.x += b.x;
        this.z += b.z;
        return this;
    };
    Vec3.prototype.sub = function (b) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        return this;
    };
    Vec3.prototype.subVector3 = function (b) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        return this;
    };
    Vec3.prototype.subXZ = function (b) {
        this.x -= b.x;
        this.z -= b.z;
        return this;
    };
    Vec3.prototype.mul = function (v) {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        return this;
    };
    Vec3.prototype.div = function (v) {
        this.x /= v;
        this.y /= v;
        this.z /= v;
        return this;
    };
    Vec3.add = function (a, b) {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    };
    Vec3.sub = function (a, b) {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    };
    Vec3.subXZ = function (a, b) {
        return new Vec3(a.x - b.x, 0, a.z - b.z);
    };
    Vec3.mul = function (a, b) {
        return new Vec3(a.x * b, a.y * b, a.z * b);
    };
    Vec3.div = function (a, b) {
        return new Vec3(a.x / b, a.y / b, a.z / b);
    };
    Vec3.prototype.set = function (x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    };
    Vec3.prototype.setVec3 = function (b) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
    };
    Vec3.prototype.setXZ = function (x, z) {
        if (x === void 0) { x = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.z = z;
    };
    Vec3.prototype.clone = function () {
        return new Vec3(this.x, this.y, this.z);
    };
    Vec3.prototype.cloneXZ = function () {
        return new Vec3(this.x, 0, this.z);
    };
    Vec3.prototype.normalize = function () {
        var rlen = 1 / this.magnitude;
        this.x *= rlen;
        this.y *= rlen;
        this.z *= rlen;
        return this;
    };
    Object.defineProperty(Vec3.prototype, "normalized", {
        get: function () {
            var rlen = 1 / this.magnitude;
            return new Vec3(this.x * rlen, this.y * rlen, this.z * rlen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "normalizedXZ", {
        get: function () {
            var rlen = 1 / this.magnitudeXZ;
            return new Vec3(this.x * rlen, 0, this.z * rlen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "magnitude", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "magnitudeXZ", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.z * this.z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        enumerable: true,
        configurable: true
    });
    Vec3.distance = function (v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
    Vec3.distanceXZ = function (v1, v2) {
        var dx = v1.x - v2.x;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dz * dz);
    };
    Vec3.distanceXZ2 = function (v1, v2x, v2z) {
        var dx = v1.x - v2x;
        var dz = v1.z - v2z;
        return Math.sqrt(dx * dx + dz * dz);
    };
    Vec3.sqrDistance = function (v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return dx * dx + dy * dy + dz * dz;
    };
    /**
     * 归零
     */
    Vec3.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    };
    Vec3.prototype.toString = function () {
        return this.x + ", " + this.y + ", " + this.z;
    };
    return Vec3;
}());
exports.Vec3 = Vec3;
//# sourceMappingURL=vec3.js.map