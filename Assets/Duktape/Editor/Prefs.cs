using System;
using System.Collections.Generic;

namespace Duktape
{
    using UnityEngine;
    using UnityEditor;
    using UnityEngine.Serialization;

    // duktape 配置 (editor only)
    public class Prefs
    {
        public const string PATH = "duktape.json";

        public string logPath = "Temp/duktape.log";

        private bool _dirty;
        private string _filePath;

        // 静态绑定代码的生成目录
        public string outDir = "Assets/Generated";
        public string typescriptDir = "Assets/Generated";

        public string workspace = ".";

        // // ts 代码的目录 (例如自动生成的 Delegate 泛型, 需要放在 ts 源码目录)
        // public string tsDir = "Assets/Scripts/Source/duktape";
        // public string jsDir = "Assets/Scripts/Generated/duktape";

        public string extraExt = ""; // 生成文件的额外后缀

        public string newLineStyle;

        public string newline
        {
            get
            {
                switch (newLineStyle.ToLower())
                {
                    case "cr": return "\r";
                    case "lf": return "\n";
                    case "crlf": return "\r\n";
                    default: return Environment.NewLine;
                }
            }
        }

        public string tab = "    ";

        // 生成的绑定类所在命名空间
        public string ns = "DuktapeJS";

        // 默认不导出任何类型, 需要指定导出类型列表
        public List<string> explicitAssemblies = new List<string>(new string[]
        {
            // "Assembly-CSharp-firstpass",
            "Assembly-CSharp",
        });

        // 默认导出所有类型, 过滤黑名单
        public List<string> implicitAssemblies = new List<string>(new string[]
        {
            "UnityEngine",
            "UnityEngine.CoreModule",
            "UnityEngine.UIModule",
            // "UnityEngine.TextRenderingModule",
            // "UnityEngine.TextRenderingModule",
            // "UnityEngine.UnityWebRequestWWWModule",
            // "UnityEngine.Physics2DModule",
            // "UnityEngine.AnimationModule",
            // "UnityEngine.TextRenderingModule",
            // "UnityEngine.IMGUIModule",
            // "UnityEngine.UnityWebRequestModule",
            // "UnityEngine.PhysicsModule",
            "UnityEngine.UI",
        });

        // type.FullName 前缀满足以下任意一条时不会被导出
        public List<string> typePrefixBlacklist = new List<string>(new string[]
        {
            "JetBrains.",
            "Unity.Collections.",
            "Unity.Jobs.",
            "Unity.Profiling.",
            "UnityEditor.",
            "UnityEditorInternal.",
            "UnityEngineInternal.",
            "UnityEditor.Experimental.",
            "UnityEngine.Experimental.",
            "Unity.IO.LowLevel.",
            "Unity.Burst.",
            "UnityEngine.Assertions.",
        });

        public Prefs MarkAsDirty()
        {
            if (!_dirty)
            {
                _dirty = true;
                EditorApplication.delayCall += Save;
            }
            return this;
        }

        public static Prefs Load()
        {
            var pathlist = PATH.Split(';');
            foreach (var path in pathlist)
            {
                if (System.IO.File.Exists(path))
                {
                    try
                    {
                        var json = UnityHelper.NormalizeJson(System.IO.File.ReadAllText(path));
                        Debug.Log($"load prefs({path}): {json}");
                        var prefs = JsonUtility.FromJson<Prefs>(json);
                        prefs._filePath = path;
                        if (string.IsNullOrEmpty(prefs.typescriptDir))
                        {
                            prefs.typescriptDir = prefs.outDir;
                        }
                        return prefs;
                    }
                    catch (Exception exception)
                    {
                        Debug.LogWarning(exception);
                    }
                }
            }
            var defaultPrefs = new Prefs();
            defaultPrefs._filePath = pathlist[0];
            return defaultPrefs;
        }

        public void Save()
        {
            if (_dirty)
            {
                _dirty = false;
                try
                {
                    var json = JsonUtility.ToJson(this, true);
                    System.IO.File.WriteAllText(_filePath, json);
                }
                catch (Exception exception)
                {
                    Debug.LogWarning(exception);
                }
            }
        }
    }
}