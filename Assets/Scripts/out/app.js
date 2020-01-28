"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameDefs = {
    shot: "./game/shot/shot_game",
};
var MyBridge = /** @class */ (function () {
    function MyBridge() {
    }
    MyBridge.prototype.Awake = function () {
        // GameObject.CreatePrimitive(UnityEngine.PrimitiveType.Cube);
        // let cube = UnityFS.Utils.PrefabLoader.Load("Assets/Data/Prefabs/Cube.prefab");
        var _this = this;
        // setTimeout(function () {
        //     UnityEngine.Object.Destroy(cube.gameObject);
        // }, 1000 * 10);
        var proto = require(GameDefs["shot"]);
        this._game = new proto.default();
        this._game.init(function () {
            _this._game.restart();
        });
    };
    MyBridge.prototype.Update = function (deltaTime) {
        this._game.update(deltaTime);
    };
    MyBridge.prototype.OnApplicationQuit = function () {
        console.log("byebye!");
    };
    return MyBridge;
}());
exports.MyBridge = MyBridge;
//# sourceMappingURL=app.js.map