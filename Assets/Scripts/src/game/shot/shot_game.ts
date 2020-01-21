import { ShotShip } from "./shot_ship";
import { ShotBullet } from "./shot_bullet";
import { Vec2 } from "../../base/vec2";
import { Random } from "../../base/random";
import { IGame } from "../common/game";

export default class implements IGame {
    private _ship: ShotShip;
    private _bullets: Array<ShotBullet> = [];
    private _bulletCountMax = 100;
    private _inactive: Array<number> = [];
    private _nextMegaBullet = 10;
    private _bulletIndex = 0;
    private _rng = new Random();
    private _posEmitter: Array<() => Vec2> = [];

    private _time = 0;
    private _bulletInterval = 0;
    private _bulletTime = 0;

    private _speed = 7;
    private _speedDiff = 1;

    private _xMin = 0;
    private _yMin = 0;
    private _xMax = 0;
    private _yMax = 0;

    init() {
        this._xMin = -50;
        this._yMin = -50;
        this._xMax = 50;
        this._yMax = 50;
        this._bulletInterval = 2;

        this._posEmitter[0] = () => new Vec2(this._rng.rangeDouble(this._xMin, this._xMax), this._yMin);
        this._posEmitter[2] = () => new Vec2(this._rng.rangeDouble(this._xMin, this._xMax), this._yMax);

        this._posEmitter[1] = () => new Vec2(this._xMin, this._rng.rangeDouble(this._yMin, this._yMax));
        this._posEmitter[3] = () => new Vec2(this._xMax, this._rng.rangeDouble(this._yMin, this._yMax));

        this._ship = new ShotShip();
        this._ship.init();
    }

    contains(pos: Vec2) {
        return pos.x >= this._xMin && pos.x <= this._xMax && pos.y >= this._yMin && pos.y <= this._yMax;
    }

    shot(n: number) {
        while (n-- > 0) {
            let b = this.createBullet();
            if (!b) {
                return;
            }
            this._bulletIndex++;
            let sv = this._rng.rangeDouble(this._speed - this._speedDiff, this._speed + this._speedDiff);
            let edge = this._rng.range32(0, this._posEmitter.length);
            let p1 = this._posEmitter[edge]();
            let p2 = this._ship.poistion;
            if (this._bulletIndex >= this._nextMegaBullet) {
                sv *= 1.25;
                this._nextMegaBullet += 20;
            }
            let s = Vec2.sub(p2, p1).normalize().mul(sv);
            b.restart(p1, s);
        }
    }

    private createBullet() {
        let n = this._inactive.length;
        if (this._bullets.length - n > this._bulletCountMax) {
            return null;
        }
        let b: ShotBullet;
        if (n == 0) {
            b = new ShotBullet();
            this._bullets.push(b);
            b.init();
        } else {
            let f = this._inactive.splice(n - 1)[0];
            b = this._bullets[f];
        }
        return b;
    }

    update(dt: number) {
        this._time += dt;
        let bulletCount = this._bullets.length;
        for (let i = 0; i < bulletCount; i++) {
            let bullet = this._bullets[i];
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
    }

    restart() {
        let bulletCount = this._bullets.length;
        for (let i = 0; i < bulletCount; i++) {
            let bullet = this._bullets[i];
            if (bullet.actived) {
                bullet.deactivate();
                this._inactive.push(i);
            }
        }
        this._ship.restart();
    }

    destroy() {
        let bulletCount = this._bullets.length;
        for (let i = 0; i < bulletCount; i++) {
            let bullet = this._bullets[i];
            bullet.destroy();
        }
        this._bullets.splice(0);
        this._inactive.splice(0);
        this._ship.destroy();
    }
}

