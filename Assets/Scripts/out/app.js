"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input = UnityEngine.Input;
var KeyCode = UnityEngine.KeyCode;
var GameObject = UnityEngine.GameObject;
function greet() {
    console.log("good day!");
}
var MyBridge = /** @class */ (function () {
    function MyBridge() {
        this._clickcount = 0;
    }
    MyBridge.prototype.Awake = function () {
        GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
        var cube = UnityFS.Utils.PrefabLoader.Load("Assets/Data/Prefabs/Cube.prefab");
        setTimeout(function () {
            UnityEngine.Object.Destroy(cube.gameObject);
        }, 1000 * 10);
    };
    MyBridge.prototype.Update = function (deltaTime) {
        if (Input.GetKeyUp(KeyCode.Space) || Input.GetMouseButtonUp(0)) {
            console.log("key pressed!", this._clickcount++);
            greet();
        }
    };
    MyBridge.prototype.OnApplicationQuit = function () {
        console.log("byebye!");
    };
    return MyBridge;
}());
exports.MyBridge = MyBridge;
//# sourceMappingURL=app.js.map