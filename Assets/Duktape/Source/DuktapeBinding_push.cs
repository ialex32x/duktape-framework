using System;
using System.Collections.Generic;
using AOT;

namespace Duktape
{
    using UnityEngine;

    public partial class DuktapeBinding
    {
        public static void duk_push_primitive(IntPtr ctx, IntPtr o)
        {
            duk_push_classvalue(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, bool o)
        {
            DuktapeDLL.duk_push_boolean(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, sbyte o)
        {
            DuktapeDLL.duk_push_int(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, byte o)
        {
            DuktapeDLL.duk_push_int(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, char o)
        {
            DuktapeDLL.duk_push_int(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, string o)
        {
            DuktapeDLL.duk_push_string(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, short o)
        {
            DuktapeDLL.duk_push_int(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, ushort o)
        {
            DuktapeDLL.duk_push_int(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, int o)
        {
            DuktapeDLL.duk_push_int(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, uint o)
        {
            DuktapeDLL.duk_push_uint(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, long o)
        {
            DuktapeDLL.duk_push_number(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, ulong o)
        {
            DuktapeDLL.duk_push_number(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, float o)
        {
            DuktapeDLL.duk_push_number(ctx, o);
        }

        public static void duk_push_primitive(IntPtr ctx, double o)
        {
            DuktapeDLL.duk_push_number(ctx, o);
        }

        public static void duk_push_structvalue(IntPtr ctx, LayerMask o)
        {
            DuktapeDLL.duk_push_int(ctx, (int)o);
        }

        public static void duk_push_structvalue(IntPtr ctx, Color o)
        {
            DuktapeDLL.duk_unity_push_color(ctx, o.r, o.g, o.b, o.a);
        }

        public static void duk_push_structvalue(IntPtr ctx, Color32 o)
        {
            DuktapeDLL.duk_unity_push_color32(ctx, o.r, o.g, o.b, o.a);
        }

        public static void duk_push_structvalue(IntPtr ctx, Vector2 o)
        {
            DuktapeDLL.duk_unity_push_vector2(ctx, o.x, o.y);
        }

        public static void duk_push_structvalue(IntPtr ctx, Vector2Int o)
        {
            DuktapeDLL.duk_unity_push_vector2i(ctx, o.x, o.y);
        }

        public static void duk_push_structvalue(IntPtr ctx, Vector3 o)
        {
            DuktapeDLL.duk_unity_push_vector3(ctx, o.x, o.y, o.z);
        }

        public static void duk_push_structvalue(IntPtr ctx, Vector3Int o)
        {
            DuktapeDLL.duk_unity_push_vector3i(ctx, o.x, o.y, o.z);
        }

        public static void duk_push_structvalue(IntPtr ctx, Vector4 o)
        {
            DuktapeDLL.duk_unity_push_vector4(ctx, o.x, o.y, o.z, o.w);
        }

        public static void duk_push_structvalue(IntPtr ctx, Quaternion o)
        {
            DuktapeDLL.duk_unity_push_quaternion(ctx, o.x, o.y, o.z, o.w);
        }

        // public static void duk_push_structvalue(IntPtr ctx, Matrix4x4 o)
        // {
        //     DuktapeDLL.duk_push_array(ctx);
        //     DuktapeDLL.duk_unity_put16f(ctx, -1, ...);
        // }

        public static void duk_push_structvalue<T>(IntPtr ctx, T o)
        where T : struct
        {
            duk_push_classvalue(ctx, o);
        }

        public static void duk_push_enumvalue<T>(IntPtr ctx, T o)
        where T : Enum
        {
            duk_push_primitive(ctx, Convert.ToInt32(o));
        }

        // variant push
        public static void duk_push_classvalue(IntPtr ctx, UnityEngine.Object o)
        {
            if (o == null)
            {
                DuktapeDLL.duk_push_null(ctx);
                return;
            }
            duk_push_object(ctx, (object)o);
        }

        public static void duk_push_classvalue(IntPtr ctx, DuktapeObject o)
        {
            if (o == null)
            {
                DuktapeDLL.duk_push_null(ctx);
                return;
            }
            if (!o.Push(ctx))
            {
                DuktapeDLL.duk_push_null(ctx);
            }
        }

        public static void duk_push_classvalue(IntPtr ctx, Array o)
        {
            if (o == null)
            {
                DuktapeDLL.duk_push_null(ctx);
                return;
            }
            if (o.GetType() == typeof(byte[]))
            {
                var typed = (byte[])o;
                var mem_ptr = DuktapeDLL.duk_push_fixed_buffer(ctx, (uint)typed.Length);
                if (mem_ptr != IntPtr.Zero)
                {
                    System.Runtime.InteropServices.Marshal.Copy(typed, 0, mem_ptr, typed.Length);
                }
                return;
            }
            duk_push_object(ctx, (object)o);
        }

        // variant push
        public static void duk_push_classvalue(IntPtr ctx, object o)
        {
            if (o == null)
            {
                DuktapeDLL.duk_push_null(ctx);
                return;
            }
            var type = o.GetType();
            if (type.IsEnum)
            {
                duk_push_primitive(ctx, Convert.ToInt32(o));
                return;
            }
            // if (type.IsArray)
            // {
            //     duk_push_any(ctx, (Array)o);
            //     return;
            // }
            if (type.BaseType == typeof(MulticastDelegate))
            {
                duk_push_delegate(ctx, (Delegate)o);
                return;
            }
            duk_push_object(ctx, (object)o);
        }

        // push 一个对象实例 （调用者需要自行负责提前null检查） 
        private static void duk_push_object(IntPtr ctx, object o)
        {
            var cache = DuktapeVM.GetObjectCache(ctx);
            IntPtr heapptr;
            if (cache.TryGetJSValue(o, out heapptr))
            {
                DuktapeDLL.duk_push_heapptr(ctx, heapptr);
                return;
            }
            DuktapeDLL.duk_push_object(ctx);
            duk_bind_native(ctx, -1, o);
        }

        // 自动判断类型
        public static void duk_push_var(IntPtr ctx, object o)
        {
            if (o == null)
            {
                DuktapeDLL.duk_push_null(ctx);
                return;
            }
            var type = o.GetType();
            if (type.IsEnum)
            {
                duk_push_primitive(ctx, Convert.ToInt32(o));
                return;
            }
            //TODO: 1. push as simple types
            //TODO: 2. fallthrough, push as object
            duk_push_classvalue(ctx, o);
        }
    }
}
