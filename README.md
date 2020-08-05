# duktape-framework
> duktape-unity 不再持续维护, 后续使用 [unity-jsb](https://github.com/ialex32x/unity-jsb) 替换 JS 运行时. 
> 
> 支持 async 等新ES标准, 并且提供了 worker api 等更多的 JS 常用 api 支持.
> 
> unity-jsb 直接基于 duktape-unity 修改开发.

基于 duktape-unity &amp; UnityFS 的框架

# [unity-jsb](https://github.com/ialex32x/unity-jsb) 特性支持
* 支持在JS异步函数中等待 Unity YieldInstruction 对象
* 支持在JS异步函数中等待 System.Threading.Tasks.Task 对象 (limited support)
* 向 JS 导入 C# 运算符重载 +, -, *, /, ==, -(负)
* 支持 Websocket (limited support)
* [初步] 支持 Worker (limited support)
* [初步] 支持 XMLHttpRequest (limited support)
* [初步] 未导出的类型通过反射方式进行 C#/JS 交互
* [初步] 运行时替换 C# 代码 (hotfix, limited support)
* [未完成] 支持 JS 字节码 (QuickJS)
* [未完成] Webpack HMR 运行时模块热替换 (limited support, for development only)
