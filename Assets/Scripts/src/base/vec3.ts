
export class Vec3 {
    x: number;
    y: number;
    z: number;

    static get zero() {
        return new Vec3(0, 0, 0);
    }

    static get one() {
        return new Vec3(1, 1, 1);
    }

    static get left() {
        return new Vec3(-1, 0, 0);
    }

    static get up() {
        return new Vec3(0, -1, 0);
    }

    static get right() {
        return new Vec3(1, 0, 0);
    }

    static get down() {
        return new Vec3(0, 1, 0);
    }

    static get forward() {
        return new Vec3(0, 0, 1);
    }

    static get back() {
        return new Vec3(0, 0, -1);
    }

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(b: Vec3) {
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
        return this;
    }

    addXZ(b: Vec3) {
        this.x += b.x;
        this.z += b.z;
        return this;
    }

    sub(b: Vec3) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        return this;
    }

    subVector3(b: UnityEngine.Vector3) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        return this;
    }

    subXZ(b: Vec3) {
        this.x -= b.x;
        this.z -= b.z;
        return this;
    }

    mul(v: number) {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        return this;
    }

    div(v: number) {
        this.x /= v;
        this.y /= v;
        this.z /= v;
        return this;
    }

    static add(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static sub(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static subXZ(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x - b.x, 0, a.z - b.z);
    }

    static mul(a: Vec3, b: number): Vec3 {
        return new Vec3(a.x * b, a.y * b, a.z * b);
    }

    static div(a: Vec3, b: number): Vec3 {
        return new Vec3(a.x / b, a.y / b, a.z / b);
    }

    set(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setVec3(b: Vec3) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
    }

    setXZ(x = 0, z = 0) {
        this.x = x;
        this.z = z;
    }

    clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    cloneXZ() {
        return new Vec3(this.x, 0, this.z);
    }

    normalize() {
        let rlen = 1 / this.magnitude;
        this.x *= rlen;
        this.y *= rlen;
        this.z *= rlen;
        return this;
    }

    get normalized() {
        let rlen = 1 / this.magnitude;
        return new Vec3(this.x * rlen, this.y * rlen, this.z * rlen);
    }

    get normalizedXZ() {
        let rlen = 1 / this.magnitudeXZ;
        return new Vec3(this.x * rlen, 0, this.z * rlen);
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    get magnitudeXZ() {
        return Math.sqrt(this.x * this.x + this.z * this.z);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    static distance(v1: Vec3, v2: Vec3) {
        let dx = v1.x - v2.x;
        let dy = v1.y - v2.y;
        let dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    static distanceXZ(v1: Vec3, v2: Vec3) {
        let dx = v1.x - v2.x;
        let dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dz * dz);
    }

    static distanceXZ2(v1: Vec3, v2x: number, v2z: number) {
        let dx = v1.x - v2x;
        let dz = v1.z - v2z;
        return Math.sqrt(dx * dx + dz * dz);
    }

    static sqrDistance(v1: Vec3, v2: Vec3) {
        let dx = v1.x - v2.x;
        let dy = v1.y - v2.y;
        let dz = v1.z - v2.z;
        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * 归零
     */
    zero() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    }

    toString() {
        return this.x + ", " + this.y + ", " + this.z;
    }
}
