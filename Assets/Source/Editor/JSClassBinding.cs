using System.Collections;
using System.Collections.Generic;
using System;

namespace Duktape
{
    using UnityEngine;
    using UnityEditor;

    public class JSClassBinding : AbstractBindingProcess
    {
        public override void OnPreExporting(BindingManager bindingManager)
        {
            bindingManager.AddExportedType(typeof(UnityEngine.KeyCode));
            bindingManager.AddExportedType(typeof(UnityEngine.Vector2));
            bindingManager.AddExportedType(typeof(UnityEngine.Vector3));
            bindingManager.AddExportedType(typeof(UnityEngine.Vector4));
            bindingManager.AddExportedType(typeof(UnityEngine.Quaternion));
            bindingManager.AddExportedType(typeof(UnityEngine.GameObject), true);
            bindingManager.AddExportedType(typeof(UnityEngine.Mathf));
            bindingManager.AddExportedType(typeof(UnityEngine.PrimitiveType));
            bindingManager.AddExportedType(typeof(UnityEngine.Color));
            bindingManager.AddExportedType(typeof(UnityEngine.MonoBehaviour), true)
                .SetMemberBlocked("runInEditMode");
            bindingManager.AddExportedType(typeof(UnityEngine.Transform), true);
            bindingManager.AddExportedType(typeof(UnityEngine.UI.Text), true)
                .SetMemberBlocked("OnRebuildRequested");
            bindingManager.AddExportedType(typeof(UnityEngine.UI.Graphic))
                .SetMemberBlocked("OnRebuildRequested");
            bindingManager.AddExportedType(typeof(UnityEngine.UI.Button), true);
            bindingManager.AddExportedType(typeof(UnityEngine.UI.Button.ButtonClickedEvent), true);
            bindingManager.AddExportedType(typeof(UnityEngine.Random));
            bindingManager.AddExportedType(typeof(UnityEngine.Camera), true);
            bindingManager.AddExportedType(typeof(UnityEngine.Time));
            bindingManager.AddExportedType(typeof(UnityEngine.Input))
                .SetMemberBlocked("IsJoystickPreconfigured");

            bindingManager.AddExportedType(typeof(UnityFS.ResourceManager));
            bindingManager.AddExportedType(typeof(UnityFS.UAsset));
            bindingManager.AddExportedType(typeof(UnityFS.UBundle));
            bindingManager.AddExportedType(typeof(UnityFS.UScene));
            bindingManager.AddExportedType(typeof(UnityFS.Utils.PrefabLoader));
            bindingManager.AddExportedType(typeof(UnityFS.Utils.AssetHandle));
            bindingManager.AddExportedType(typeof(UnityFS.IFileSystem));

            bindingManager.AddExportedType(typeof(Duktape.Extensions));
        }
    }
}
