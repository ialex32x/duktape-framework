using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace Duktape
{
    using UnityEngine;

    public class Launcher : MonoBehaviour, IDuktapeListener
    {
        public bool debuggerSupport = true;
        public bool waitForDebuggerAttack = false;
        public string scriptRootPath = "Assets/Scripts/out";
        public string entryScript = "main";
        public bool devMode = true;

        private DuktapeVM _vm;

        public void OnBinded(DuktapeVM vm, int numRegs) { }

        public void OnBindingError(DuktapeVM vm, Type type) { }

        public void OnProgress(DuktapeVM vm, int step, int total) { }

        public void OnTypesBinding(DuktapeVM vm) { }

        public void OnLoaded(DuktapeVM vm)
        {
            _vm.AddSearchPath(scriptRootPath);
            if (debuggerSupport)
            {
                DuktapeDebugger.CreateDebugger(_vm);
                if (waitForDebuggerAttack)
                {
                    Debug.LogWarning("waiting for debugger attach");
                    DuktapeDebugger.onAttached += () =>
                    {
                        _vm.EvalMain(entryScript);
                    };
                }
            }
            else
            {
                _vm.EvalMain(entryScript);
            }
        }

        void Awake()
        {
            // 可用下载地址列表 (会依次重试, 次数超过地址数量时反复重试最后一个地址)
            // 适用于 CDN 部署还没有全部起作用时, 退化到直接文件服务器地址
            var urls = UnityFS.Utils.Helpers.URLs(
                // "http://localhost:8081/",
                "http://localhost:8080/"
            );

            // 下载存储目录
            var dataPath = string.IsNullOrEmpty(Application.temporaryCachePath) ? Application.persistentDataPath : Application.temporaryCachePath;
            var localPathRoot = Path.Combine(dataPath, "bundles");
            Debug.Log($"open localPathRoot: {localPathRoot}");

            UnityFS.ResourceManager.Initialize(devMode, localPathRoot, urls, () =>
            {
                _vm = new DuktapeVM();
                Debug.LogFormat("resource manager initialized: {0}", Time.realtimeSinceStartup);
                var entryScriptFile = Path.Combine(scriptRootPath, entryScript.EndsWith(".js") ? entryScript : entryScript + ".js").Replace('\\', '/');
                UnityFS.ResourceManager.FindFileSystem(entryScriptFile).completed +=
                    fs => _vm.Initialize(new FileSystem(fs), this, 1000);
            });
        }

        void OnDestroy()
        {
            _vm.Destroy();
            _vm = null;
        }
    }
}