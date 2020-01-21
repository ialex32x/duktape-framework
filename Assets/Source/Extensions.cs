using System;
using System.Text;

namespace Duktape
{
    using UnityEngine;

    public static class Extensions
    {
        public static void SetLocalPosition(this Transform t, float x, float y, float z)
        {
            t.localPosition = new Vector3(x, y, z);
        }

        public static void SetLocalRotation(this Transform t, float x, float y, float z)
        {
            t.localRotation = Quaternion.Euler(x, y, z);
        }
    }
}
