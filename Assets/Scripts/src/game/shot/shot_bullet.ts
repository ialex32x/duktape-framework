import { Vec2 } from "../../base/vec2";
import Transform = UnityEngine.Transform;
import GameObject = UnityEngine.GameObject;
import UObject = UnityEngine.Object;

export class ShotBullet {
    private _position: Vec2;
    private _speed: Vec2;
    private _active = false;
    private _gameObject: GameObject;
    private _transform: Transform;

    get x() {
        return this._position.x;
    }

    get y() {
        return this._position.y;
    }

    get position() {
        return this._position;
    }

    get actived() {
        return this._active;
    }

    init() {
        this._gameObject = GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
        this._transform = this._gameObject.transform;
    }

    restart(sourcePosition: Vec2, speed: Vec2) {
        this._position = sourcePosition;
        this._speed = speed;
        this._active = true;
        this._gameObject.SetActive(true);

    }

    deactivate() {
        this._active = false;
        this._gameObject.SetActive(false);
    }

    update(dt: number) {
        this._position.add(Vec2.mul(this._speed, dt));
        this._transform.SetLocalPosition(this._position.x, this._position.y, 0);
    }

    destroy() {
        UObject.Destroy(this._gameObject);
        this._gameObject = null;
        this._transform = null;
    }
}
