"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_util_1 = require("./math_util");
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vec2, "zero", {
        get: function () {
            return new Vec2(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2, "one", {
        get: function () {
            return new Vec2(1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2, "left", {
        get: function () {
            return new Vec2(-1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2, "up", {
        get: function () {
            return new Vec2(0, -1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2, "right", {
        get: function () {
            return new Vec2(1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2, "down", {
        get: function () {
            return new Vec2(0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };
    Vec2.prototype.normalize = function () {
        var rlen = 1 / this.length;
        this.x *= rlen;
        this.y *= rlen;
        return this;
    };
    Object.defineProperty(Vec2.prototype, "normalized", {
        get: function () {
            var rlen = 1 / this.length;
            return new Vec2(this.x * rlen, this.y * rlen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: true,
        configurable: true
    });
    Vec2.distance = function (v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Vec2.sqrDistance = function (v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        return dx * dx + dy * dy;
    };
    /**
     * 归零
     */
    Vec2.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
        return this;
    };
    /**
     * 重新赋值
     */
    Vec2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    /**
     * 偏移
     */
    Vec2.prototype.translate = function (x, y) {
        this.x += x;
        this.y += y;
    };
    Vec2.prototype.add = function (b) {
        this.x += b.x;
        this.y += b.y;
        return this;
    };
    Vec2.prototype.sub = function (b) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    };
    Vec2.prototype.mul = function (v) {
        this.x *= v;
        this.y *= v;
        return this;
    };
    Vec2.prototype.div = function (v) {
        this.x /= v;
        this.y /= v;
        return this;
    };
    Vec2.add = function (a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    };
    Vec2.sub = function (a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    };
    Vec2.mul = function (a, b) {
        return new Vec2(a.x * b, a.y * b);
    };
    Vec2.div = function (a, b) {
        return new Vec2(a.x / b, a.y / b);
    };
    Vec2.prototype.cross = function (b) {
        return this.x * b.y - this.y * b.x;
    };
    Vec2.prototype.dot = function (b) {
        return this.x * b.x + this.y * b.y;
    };
    Vec2.cross = function (a, b) {
        return a.x * b.y - a.y * b.x;
    };
    Vec2.dot = function (a, b) {
        return a.x * b.x + a.y * b.y;
    };
    /**
     * 旋转一定角度 (弧度值)
     */
    Vec2.prototype.rotate = function (radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        this.x = this.x * cos - this.y * sin;
        this.y = this.x * sin + this.y * cos;
        return this;
    };
    Vec2.rotate = function (vec, radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        return new Vec2(vec.x * cos - vec.y * sin, vec.x * sin + vec.y * cos);
    };
    Vec2.prototype.angle_deprecated = function (v2) {
        return Math.atan2(this.cross(v2), this.dot(v2));
    };
    /**
     * 返回两个向量的夹角 (角度值)
     */
    Vec2.prototype.angle = function (b) {
        var denominator = Math.sqrt((this.x * this.x + this.y * this.y) * (b.x * b.x + b.y * b.y));
        if (denominator < math_util_1.MathUtil.kEpsilonNormalSqrt) {
            return 0;
        }
        var dot = this.dot(b) / denominator;
        if (dot > 1) {
            dot = 1;
        }
        else if (dot < -1) {
            dot = -1;
        }
        return Math.acos(dot) * math_util_1.MathUtil.rad2deg;
    };
    /// <summary>
    /// 求两个向量的夹角(正负180度) (角度值)
    /// </summary>
    Vec2.prototype.signedAngle = function (b) {
        var angle = this.angle(b);
        return this.x * b.y - this.y * b.x >= 0 ? angle : -angle;
    };
    /**
     * 线性插值
     */
    Vec2.prototype.lerp = function (v2, p) {
        return new Vec2(math_util_1.MathUtil.lerp(this.x, v2.x, p), math_util_1.MathUtil.lerp(this.y, v2.y, p));
    };
    /**
     * 线性插值
     */
    Vec2.lerp = function (v1, v2, p) {
        return new Vec2(math_util_1.MathUtil.lerp(v1.x, v2.x, p), math_util_1.MathUtil.lerp(v1.y, v2.y, p));
    };
    /**
     * 球面插值
     */
    Vec2.prototype.slerp = function (v2, p) {
        var theta = this.angle(v2);
        return Vec2.rotate(this, theta * p);
    };
    /**
     * 球面插值
     */
    Vec2.slerp = function (v1, v2, p) {
        var theta = v1.angle(v2);
        return Vec2.rotate(v1, theta * p);
    };
    Vec2.angle_deprecated = function (v1, v2) {
        return Math.atan2(v1.cross(v2), v1.dot(v2));
    };
    /**
     * 返回两个向量的夹角 (角度值)
     */
    Vec2.angle = function (a, b) {
        var denominator = Math.sqrt((a.x * a.x + a.y * a.y) * (b.x * b.x + b.y * b.y));
        if (denominator < math_util_1.MathUtil.kEpsilonNormalSqrt) {
            return 0;
        }
        var dot = this.dot(a, b) / denominator;
        if (dot > 1) {
            dot = 1;
        }
        else if (dot < -1) {
            dot = -1;
        }
        return Math.acos(dot) * math_util_1.MathUtil.rad2deg;
    };
    /// <summary>
    /// 求两个向量的夹角(正负180度) (角度值)
    /// </summary>
    Vec2.signedAngle = function (a, b) {
        var angle = this.angle(a, b);
        return a.x * b.y - a.y * b.x >= 0 ? angle : -angle;
    };
    Vec2.prototype.toString = function () {
        return this.x + ", " + this.y;
    };
    return Vec2;
}());
exports.Vec2 = Vec2;
//# sourceMappingURL=vec2.js.map