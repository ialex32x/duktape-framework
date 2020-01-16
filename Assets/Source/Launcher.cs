using System;
using System.Collections;
using System.Collections.Generic;

namespace Duktape
{
    using UnityEngine;

    public class Launcher : MonoBehaviour, IDuktapeListener
    {
        public bool debuggerSupport;
        public string entryScript = "main";

        private DuktapeVM _vm;

        public void OnBinded(DuktapeVM vm, int numRegs) { }

        public void OnBindingError(DuktapeVM vm, Type type) { }

        public void OnProgress(DuktapeVM vm, int step, int total) { }

        public void OnTypesBinding(DuktapeVM vm) { }

        public void OnLoaded(DuktapeVM vm)
        {
            _vm.AddSearchPath("Assets/Scripts/out");
            if (debuggerSupport)
            {
                DuktapeDebugger.CreateDebugger(_vm);
            }
            _vm.EvalMain(entryScript);
        }

        void Awake()
        {
            _vm = new DuktapeVM();
            _vm.Initialize(this);
        }

        void OnDestroy()
        {
            _vm.Destroy();
            _vm = null;
        }
    }
}