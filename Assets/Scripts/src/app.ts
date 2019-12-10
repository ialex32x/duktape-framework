import Input = UnityEngine.Input;
import KeyCode = UnityEngine.KeyCode;
import GameObject = UnityEngine.GameObject;

function greet() {
    console.log("good day!");
}

export class MyBridge {
    private _clickcount = 0;

    Awake() {
        GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
    }

    Update(deltaTime: number) {
        if (Input.GetKeyUp(KeyCode.Space) || Input.GetMouseButtonUp(0)) {
            console.log("key pressed!", this._clickcount++);
            greet();
        }
    }

    OnApplicationQuit() {
        console.log("byebye!");
    }
}
