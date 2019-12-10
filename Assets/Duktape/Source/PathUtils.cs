using System;
using System.Collections.Generic;

namespace Duktape
{
    public static class PathUtils
    {
        public static string GetDirectoryName(string path)
        {
            return string.IsNullOrEmpty(path) ? path : System.IO.Path.GetDirectoryName(path).Replace('\\', '/');
        }

        public static string Combine(string path1, string path2)
        {
            return System.IO.Path.Combine(path1, path2).Replace('\\', '/');
        }

        public static string Combine(string path1, string path2, string path3)
        {
            return System.IO.Path.Combine(path1, path2, path3).Replace('\\', '/');
        }

        public static string Combine(string path1, string path2, string path3, string path4)
        {
            return System.IO.Path.Combine(path1, path2, path3, path4).Replace('\\', '/');
        }

        public static string Combine(params string[] paths)
        {
            return System.IO.Path.Combine(paths).Replace('\\', '/');
        }

        /// 展开路径中的 ./..
        public static string ExtractPath(string path, char sp)
        {
            var items = path.Split(sp);
            if (items.Length < 2)
            {
                return path;
            }
            var array = new List<string>(items.Length);
            for (var i = 0; i < items.Length; i++)
            {
                var item = items[i];
                switch (item)
                {
                    case ".": break;
                    case "..": array.RemoveAt(array.Count - 1); break;
                    default: array.Add(item); break;
                }
            }
            return Combine(array.ToArray());
        }
    }
}