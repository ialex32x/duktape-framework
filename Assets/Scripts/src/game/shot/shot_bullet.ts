import { Vec2 } from "../../base/vec2";
import Transform = UnityEngine.Transform;
import GameObject = UnityEngine.GameObject;
import UObject = UnityEngine.Object;

export class ShotBullet {
    private _position: Vec2;
    private _speed: Vec2;
    private _size: number;
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

    init(mat: UnityEngine.Material) {
        this._gameObject = GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Sphere);
        this._transform = this._gameObject.transform;
        let renderer = this._gameObject.GetComponent(UnityEngine.MeshRenderer);
        renderer.sharedMaterial = mat;
    }

    restart(sourcePosition: Vec2, speed: Vec2) {
        this._position = sourcePosition;
        this._size = UnityEngine.Random.Range(0.65, 1.85);
        this._transform.localScale = new UnityEngine.Vector3(this._size, this._size, this._size);
        this._speed = speed.mul(this._size);
        this._active = true;
        this._transform.SetLocalPosition(this._position.x, this._position.y, 5);
        this._gameObject.SetActive(true);

    }

    deactivate() {
        this._active = false;
        this._gameObject.SetActive(false);
    }

    update(dt: number) {
        this._position.add(Vec2.mul(this._speed, dt));
        this._transform.SetLocalPosition(this._position.x, this._position.y, 5);
    }

    destroy() {
        UObject.Destroy(this._gameObject);
        this._gameObject = null;
        this._transform = null;
    }
}
