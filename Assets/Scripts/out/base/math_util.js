"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vec2_1 = require("./vec2");
var vec3_1 = require("./vec3");
var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    /**
     * 在 [a, b] 范围内随机
     */
    MathUtil.randrange = function (a, b) {
        return a < b ? Math.random() * (b - a) + a : Math.random() * (a - b) + b;
    };
    /**
     * 求两点距离
     */
    MathUtil.mag = function (x0, y0, x1, y1) {
        return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
    };
    /**
     * 两个向量的角度 (弧度值)
     */
    MathUtil.getAngle = function (x1, y1, x2, y2) {
        var len1 = Math.sqrt(x1 * x1 + y1 * y1);
        var len2 = Math.sqrt(x2 * x2 + y2 * y2);
        return Math.acos((x1 * x2 + y1 * y2) / (len1 * len2));
    };
    /**
     * 两个向量的角度 (无符号)(角度值)
     */
    MathUtil.angle = function (ax, ay, bx, by) {
        var denominator = Math.sqrt((ax * ax + ay * ay) * (bx * bx + by * by));
        if (denominator < this.kEpsilonNormalSqrt) {
            return 0;
        }
        var dot = this.dot(ax, ay, bx, by) / denominator;
        if (dot > 1) {
            dot = 1;
        }
        else if (dot < -1) {
            dot = -1;
        }
        return Math.acos(dot) * this.rad2deg;
    };
    /**
     * 两个向量的角度 (带符号)(角度值)
     */
    MathUtil.signedAngle = function (ax, ay, bx, by) {
        var angle = this.angle(ax, ay, bx, by);
        return ax * by - ay * bx >= 0 ? angle : -angle;
    };
    MathUtil.dot = function (ax, ay, bx, by) {
        return ax * bx + ay * by;
    };
    /**
     * 向量旋转
     */
    MathUtil.rotate = function (x, y, radAngle) {
        var cos = Math.cos(radAngle);
        var sin = Math.sin(radAngle);
        return new vec2_1.Vec2(x * cos - y * sin, x * sin + y * cos);
    };
    /**
     * 已知两点绘制直线, 回调每一个点 (整数点)
     */
    MathUtil.line = function (x0, y0, x1, y1, cb) {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;
        while (true) {
            cb(x0, y0); // Do what you need to for this
            if (Math.abs(x0 - x1) < 0.0001 && Math.abs(y0 - y1) < 0.0001)
                break;
            var e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    };
    /**
     * 求点到线段的距离
     */
    MathUtil.pointToSegment = function (point, start, end) {
        var cross = (end.x - start.x) * (point.x - start.x) + (end.z - start.z) * (point.z - start.z);
        if (cross <= 0) {
            return vec3_1.Vec3.distanceXZ(point, start);
        }
        var d2 = (end.x - start.x) * (end.x - start.x) + (end.z - start.z) * (end.z - start.z);
        if (cross >= d2) {
            return vec3_1.Vec3.distanceXZ(point, end);
        }
        var r = cross / d2;
        return vec3_1.Vec3.distanceXZ2(point, start.x + (end.x - start.x) * r, start.z + (end.z - start.z) * r);
    };
    MathUtil.approximately = function (a, b) {
        var d = a - b;
        return (d >= 0 && d < this.epsilon) || (d < 0 && d > -this.epsilon);
    };
    /**
     * 插值
     */
    MathUtil.lerp = function (a, b, f) {
        if (a < b) {
            return a + (b - a) * this.clamp(f, 0, 1);
        }
        return a - (a - b) * this.clamp(f, 0, 1);
    };
    /**
     * 按范围截断取值
     */
    MathUtil.clamp = function (v, f, t) {
        if (v < f)
            return f;
        if (v > t)
            return t;
        return v;
    };
    /**
     * 随机取数组中的一个元素
     */
    MathUtil.rand = function (items) {
        return items[Math.floor(Math.random() * (items.length - 0.1))];
    };
    MathUtil.kEpsilonNormalSqrt = 1e-15;
    MathUtil.epsilon = 1e-3;
    MathUtil.rad2deg = 57.29577951308232;
    MathUtil.deg2rad = 0.017453292519943295;
    MathUtil.pi = 3.14159265358979;
    MathUtil.pi2 = 6.28318530717958;
    return MathUtil;
}());
exports.MathUtil = MathUtil;
//# sourceMappingURL=math_util.js.map