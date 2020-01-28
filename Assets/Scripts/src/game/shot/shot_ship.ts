import { Vec2 } from "../../base/vec2";
import Transform = UnityEngine.Transform;
import GameObject = UnityEngine.GameObject;
import UObject = UnityEngine.Object;
import Input = UnityEngine.Input;
import KeyCode = UnityEngine.KeyCode;
import ShotGame from "./shot_game";

export class ShotShip {
    private _position = Vec2.zero;
    private _speed = Vec2.zero;
    private _scalarSpeed = 10;
    private _halfExt = new UnityEngine.Vector3(0.5, 0.5, 0.5);
    private _lifetime = 0;
    private _alive: boolean;

    private _gameObject: GameObject;
    private _transform: Transform;
    private _game: ShotGame;

    get poistion() {
        return this._position;
    }

    get alive() {
        return this._alive;
    }

    get lifetime() {
        return this._lifetime;
    }

    init(game: ShotGame) {
        this._game = game;
        this._gameObject = GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
        let co = this._gameObject.GetComponent(UnityEngine.BoxCollider);
        UnityEngine.Object.DestroyImmediate(co);
        co = null;
        this._transform = this._gameObject.transform;
        this._transform.localScale = new UnityEngine.Vector3(2, 2, 2);
    }

    restart() {
        this._position.zero();
        this._lifetime = 0;
        this._alive = true;
    }

    update(dt: number) {
        if (this._alive) {
            this._lifetime += dt;
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
            let a = dt * this._scalarSpeed;
            this._speed.set(dx * a, dy * a);
            let nx = this._position.x + this._speed.x;
            let ny = this._position.y + this._speed.y;
            if (this._game.movable(nx, ny)) {
                this._position.set(nx, ny);
                this._transform.SetLocalPosition(this._position.x, this._position.y, 0);
            }
            if (UnityEngine.Physics.BoxCast(this._transform.localPosition, this._halfExt, UnityEngine.Vector3.forward)) {
                this._alive = false;
            }
        }
    }

    destroy() {
        this._game = null;
        UObject.Destroy(this._gameObject);
        this._gameObject = null;
        this._transform = null;
    }
}