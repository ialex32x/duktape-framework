import { MathUtil } from "./math_util";

export class Vec2 {
    x: number;
    y: number;

    static get zero() {
        return new Vec2(0, 0);
    }

    static get one() {
        return new Vec2(1, 1);
    }

    static get left() {
        return new Vec2(-1, 0);
    }

    static get up() {
        return new Vec2(0, -1);
    }

    static get right() {
        return new Vec2(1, 0);
    }

    static get down() {
        return new Vec2(0, 1);
    }

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    normalize() {
        let rlen = 1 / this.length;
        this.x *= rlen;
        this.y *= rlen;
        return this;
    }

    get normalized() {
        let rlen = 1 / this.length;
        return new Vec2(this.x * rlen, this.y * rlen);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static distance(v1: Vec2, v2: Vec2) {
        let dx = v1.x - v2.x;
        let dy = v1.y - v2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static sqrDistance(v1: Vec2, v2: Vec2) {
        let dx = v1.x - v2.x;
        let dy = v1.y - v2.y;
        return dx * dx + dy * dy;
    }

    /**
     * 归零
     */
    zero() {
        this.x = 0;
        this.y = 0;
        return this;
    }

    /**
     * 重新赋值
     */
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * 偏移
     */
    translate(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    add(b: Vec2) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    sub(b: Vec2) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }

    mul(v: number) {
        this.x *= v;
        this.y *= v;
        return this;
    }

    div(v: number) {
        this.x /= v;
        this.y /= v;
        return this;
    }

    static add(a: Vec2, b: Vec2): Vec2 {
        return new Vec2(a.x + b.x, a.y + b.y);
    }

    static sub(a: Vec2, b: Vec2): Vec2 {
        return new Vec2(a.x - b.x, a.y - b.y);
    }

    static mul(a: Vec2, b: number): Vec2 {
        return new Vec2(a.x * b, a.y * b);
    }

    static div(a: Vec2, b: number): Vec2 {
        return new Vec2(a.x / b, a.y / b);
    }

    cross(b: Vec2) {
        return this.x * b.y - this.y * b.x;
    }

    dot(b: Vec2) {
        return this.x * b.x + this.y * b.y;
    }

    static cross(a: Vec2, b: Vec2) {
        return a.x * b.y - a.y * b.x;
    }

    static dot(a: Vec2, b: Vec2) {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * 旋转一定角度 (弧度值)
     */
    rotate(radian: number) {
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);
        this.x = this.x * cos - this.y * sin;
        this.y = this.x * sin + this.y * cos;
        return this;
    }

    static rotate(vec: Vec2, radian: number) {
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);
        return new Vec2(
            vec.x * cos - vec.y * sin,
            vec.x * sin + vec.y * cos
        );
    }

    angle_deprecated(v2: Vec2) {
        return Math.atan2(this.cross(v2), this.dot(v2));
    }

    /**
     * 返回两个向量的夹角 (角度值)
     */
    angle(b: Vec2) {
        let denominator = Math.sqrt((this.x * this.x + this.y * this.y) * (b.x * b.x + b.y * b.y));
        if (denominator < MathUtil.kEpsilonNormalSqrt) {
            return 0;
        }
        let dot = this.dot(b) / denominator;
        if (dot > 1) {
            dot = 1;
        } else if (dot < -1) {
            dot = -1;
        }
        return Math.acos(dot) * MathUtil.rad2deg;
    }

    /// <summary>
    /// 求两个向量的夹角(正负180度) (角度值)
    /// </summary>
    signedAngle(b: Vec2) {
        let angle = this.angle(b);
        return this.x * b.y - this.y * b.x >= 0 ? angle : -angle;
    }

    /**
     * 线性插值
     */
    lerp(v2: Vec2, p: number) {
        return new Vec2(MathUtil.lerp(this.x, v2.x, p), MathUtil.lerp(this.y, v2.y, p));
    }

    /**
     * 线性插值
     */
    static lerp(v1: Vec2, v2: Vec2, p: number) {
        return new Vec2(MathUtil.lerp(v1.x, v2.x, p), MathUtil.lerp(v1.y, v2.y, p));
    }

    /**
     * 球面插值
     */
    slerp(v2: Vec2, p: number) {
        let theta = this.angle(v2);
        return Vec2.rotate(this, theta * p);
    }

    /**
     * 球面插值
     */
    static slerp(v1: Vec2, v2: Vec2, p: number) {
        let theta = v1.angle(v2);
        return Vec2.rotate(v1, theta * p);
    }

    static angle_deprecated(v1: Vec2, v2: Vec2) {
        return Math.atan2(v1.cross(v2), v1.dot(v2));
    }

    /**
     * 返回两个向量的夹角 (角度值)
     */
    static angle(a: Vec2, b: Vec2) {
        let denominator = Math.sqrt((a.x * a.x + a.y * a.y) * (b.x * b.x + b.y * b.y));
        if (denominator < MathUtil.kEpsilonNormalSqrt) {
            return 0;
        }
        let dot = this.dot(a, b) / denominator;
        if (dot > 1) {
            dot = 1;
        } else if (dot < -1) {
            dot = -1;
        }
        return Math.acos(dot) * MathUtil.rad2deg;
    }

    /// <summary>
    /// 求两个向量的夹角(正负180度) (角度值)
    /// </summary>
    static signedAngle(a: Vec2, b: Vec2) {
        let angle = this.angle(a, b);
        return a.x * b.y - a.y * b.x >= 0 ? angle : -angle;
    }

    toString() {
        return this.x + ", " + this.y;
    }
}
