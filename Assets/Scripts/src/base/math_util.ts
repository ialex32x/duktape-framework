import { Vec2 } from "./vec2";
import { Vec3 } from "./vec3";

export class MathUtil {
    static readonly kEpsilonNormalSqrt = 1e-15;
    static readonly epsilon = 1e-3;
    static readonly rad2deg = 57.29577951308232;
    static readonly deg2rad = 0.017453292519943295;
    static readonly pi = 3.14159265358979;
    static readonly pi2 = 6.28318530717958;

    /**
     * 在 [a, b] 范围内随机
     */
    static randrange(a: number, b: number) {
        return a < b ? Math.random() * (b - a) + a : Math.random() * (a - b) + b;
    }

    /**
     * 求两点距离
     */
    static mag(x0: number, y0: number, x1: number, y1: number) {
        return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
    }

    /**
     * 两个向量的角度 (弧度值)
     */
    static getAngle(x1: number, y1: number, x2: number, y2: number) {
        let len1 = Math.sqrt(x1 * x1 + y1 * y1);
        let len2 = Math.sqrt(x2 * x2 + y2 * y2);
        return Math.acos((x1 * x2 + y1 * y2) / (len1 * len2));
    }

    /**
     * 两个向量的角度 (无符号)(角度值)
     */
    static angle(ax: number, ay: number, bx: number, by: number) {
        let denominator = Math.sqrt((ax * ax + ay * ay) * (bx * bx + by * by));
        if (denominator < this.kEpsilonNormalSqrt) {
            return 0;
        }
        let dot = this.dot(ax, ay, bx, by) / denominator;
        if (dot > 1) {
            dot = 1;
        } else if (dot < -1) {
            dot = -1;
        }
        return Math.acos(dot) * this.rad2deg;
    }

    /**
     * 两个向量的角度 (带符号)(角度值)
     */
    static signedAngle(ax: number, ay: number, bx: number, by: number) {
        let angle = this.angle(ax, ay, bx, by);
        return ax * by - ay * bx >= 0 ? angle : -angle;
    }

    static dot(ax: number, ay: number, bx: number, by: number) {
        return ax * bx + ay * by;
    }

    /**
     * 向量旋转
     */
    static rotate(x: number, y: number, radAngle: number) {
        let cos = Math.cos(radAngle);
        let sin = Math.sin(radAngle);
        return new Vec2(x * cos - y * sin, x * sin + y * cos);
    }

    /**
     * 已知两点绘制直线, 回调每一个点 (整数点)
     */
    static line(x0: number, y0: number, x1: number, y1: number, cb: (x: number, y: number) => void) {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;

        while (true) {
            cb(x0, y0);  // Do what you need to for this

            if (Math.abs(x0 - x1) < 0.0001 && Math.abs(y0 - y1) < 0.0001) break;
            var e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 < dx) { err += dx; y0 += sy; }
        }
    }

    /**
     * 求点到线段的距离
     */
    static pointToSegment(point: Vec3, start: Vec3, end: Vec3) {
        var cross = (end.x - start.x) * (point.x - start.x) + (end.z - start.z) * (point.z - start.z);
        if (cross <= 0) {
            return Vec3.distanceXZ(point, start);
        }
        var d2 = (end.x - start.x) * (end.x - start.x) + (end.z - start.z) * (end.z - start.z);
        if (cross >= d2) {
            return Vec3.distanceXZ(point, end);
        }
        var r = cross / d2;
        return Vec3.distanceXZ2(point, start.x + (end.x - start.x) * r, start.z + (end.z - start.z) * r);
    }

    static approximately(a: number, b: number): boolean {
        let d = a - b;
        return (d >= 0 && d < this.epsilon) || (d < 0 && d > -this.epsilon);
    }

    /**
     * 插值
     */
    static lerp(a: number, b: number, f: number) {
        if (a < b) {
            return a + (b - a) * this.clamp(f, 0, 1);
        }
        return a - (a - b) * this.clamp(f, 0, 1);
    }

    /**
     * 按范围截断取值
     */
    static clamp(v: number, f: number, t: number) {
        if (v < f) return f;
        if (v > t) return t;
        return v;
    }

    /**
     * 随机取数组中的一个元素
     */
    static rand(items: any[]) {
        return items[Math.floor(Math.random() * (items.length - 0.1))];
    }
}
