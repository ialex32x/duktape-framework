"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
enableStacktrace(true);
debugger;
console.log("hello, world!");
(function () {
    var go = new UnityEngine.GameObject("_jsgo");
    var bridge = go.AddComponent(DuktapeJS.Bridge);
    bridge.SetBridge(new app_1.MyBridge());
})();
//# sourceMappingURL=main.js.map