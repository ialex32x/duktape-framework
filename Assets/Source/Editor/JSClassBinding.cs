using System.Collections;
using System.Collections.Generic;
using System;

namespace Duktape
{
    using UnityEngine;
    using UnityEditor;

    public class JSClassBinding : AbstractBindingProcess
    {
        public override void OnPostExporting(BindingManager bindingManager)
        {
            bindingManager.AddExportedType(typeof(UnityFS.ResourceManager));
            bindingManager.AddExportedType(typeof(UnityFS.UAsset));
            bindingManager.AddExportedType(typeof(UnityFS.UBundle));
            bindingManager.AddExportedType(typeof(UnityFS.UScene));
            bindingManager.AddExportedType(typeof(UnityFS.Utils.PrefabLoader));
            bindingManager.AddExportedType(typeof(UnityFS.Utils.AssetHandle));
            bindingManager.AddExportedType(typeof(UnityFS.IFileSystem));
        }
    }
}
