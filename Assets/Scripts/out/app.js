"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameDefs = {
    shot: "./game/shot/shot_game",
};
var MyBridge = /** @class */ (function () {
    function MyBridge() {
    }
    MyBridge.prototype.Awake = function () {
        var _this = this;
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