import { Vec2 } from "../../base/vec2";
import Transform = UnityEngine.Transform;
import GameObject = UnityEngine.GameObject;
import UObject = UnityEngine.Object;
import Input = UnityEngine.Input;
import KeyCode = UnityEngine.KeyCode;

export class ShotShip {
    private _position = Vec2.zero;
    private _speed = Vec2.zero;

    private _gameObject: GameObject;
    private _transform: Transform;

    get poistion() {
        return this._position;
    }

    init() {
        this._gameObject = GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
        this._transform = this._gameObject.transform;
    }

    restart() {
        this._position.zero();
    }

    update(dt: number) {
        let dx = 0;
        let dy = 0;
        if (Input.GetKey(KeyCode.A)) {
            dx -= 1;
        }
        if (Input.GetKey(KeyCode.D)) {
            dx += 1;
        }
        if (Input.GetKey(KeyCode.W)) {
            dy += 1;
        }
        if (Input.GetKey(KeyCode.S)) {
            dy -= 1;
        }
        let a = dt * 2;
        this._speed.set(dx * a, dy * a);
        this._position.add(this._speed);
        this._transform.SetLocalPosition(this._position.x, this._position.y, 0);
    }

    destroy() {
        UObject.Destroy(this._gameObject);
        this._gameObject = null;
        this._transform = null;
    }
}