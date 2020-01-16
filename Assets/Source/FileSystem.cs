using System;
using System.Text;

namespace Duktape
{
    using UnityEngine;
    
    public class FileSystem : Duktape.IFileSystem
    {
        private UnityFS.IFileSystem _fs;

        public FileSystem(UnityFS.IFileSystem fs)
        {
            _fs = fs;
        }

        public bool Exists(string path)
        {
            return _fs.Exists(path);
        }

        public byte[] ReadAllBytes(string path)
        {
            try
            {
                var bytes = _fs.ReadAllBytes(path);
                return bytes;
            }
            catch (Exception exception)
            {
                Debug.LogError($"{path}: {exception}");
                return null;
            }
        }
    }
}