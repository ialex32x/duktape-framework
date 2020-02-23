import { MyBridge } from "./app";

enableStacktrace(true);
debugger;
console.log("hello, world!");

(function () {
    let go = new UnityEngine.GameObject("_jsgo");
    let bridge = go.AddComponent(DuktapeJS.Bridge);
    bridge.SetBridge(new MyBridge());
})();
